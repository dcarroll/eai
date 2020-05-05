public without sharing class XMLRequestBuilder {

    private static final String SE_NAMESPACE = 'http://schemas.xmlsoap.org/soap/envelope/';

    private static final String WSA_NAMESPACE = 'http://www.w3.org/2005/08/addressing';
    private static final String WSSE_NAMESPACE = 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd';
    private static final String WSU_NAMESPACE = 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd';
    private static final String SCH_NAMESPACE = 'http://www.sinfonia.campania.it/Schemas/';

    private static final String SE_PREFIX = 'soapenv';
    private static final String WSSE_PREFIX = 'wsse';
    private static final String WSU_PREFIX = 'wsu';
    private static final String WSA_PREFIX = 'wsa';
    private static final String SCH_PREFIX = 'sch';
    private static final String DS_PREFIX = 'ds';

    private static final String TOKEN_ENCODING_TYPE = 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary';
    private static final String TOKEN_VALUE_TYPE = 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3';

    private static String[] actions = new String[]{'Action', 'ReplyTo', 'MessageID', 'To'};

    public class RequestBuilder {

        private Dom.Document doc;
        private Dom.XMLNode envelope;

        private String prefixId;
        private Integer postfixId;

        public RequestBuilder() {
            // Created SOAP envelope, header and body and create elements
            this.doc = new Dom.Document();

            this.envelope = doc.createRootElement('Envelope', SE_NAMESPACE, SE_PREFIX);
            this.envelope.addChildElement('Header', SE_NAMESPACE, SE_PREFIX).setAttribute('xmlns:wsa', WSA_NAMESPACE);
            this.envelope.addChildElement('Body', SE_NAMESPACE, SE_PREFIX);

            // Generate prefix and postfix
            this.prefixId = '_SFDC' + RandomUtils.generateRandomString(10);
            this.postfixId = RandomUtils.generateRandomNumber(5);
        }

        public Dom.Document getDocument() {
            return this.doc;
        }

        public RequestBuilder addSecurity(String name) {
            Dom.XMLNode header = this.envelope.getChildElement('Header', SE_NAMESPACE);
            header.addChildElement(name, WSSE_NAMESPACE, WSSE_PREFIX);
            header.getChildElement(name, WSSE_NAMESPACE).setAttribute('soapenv:mustUnderstand', '1');
            header.getChildElement(name, WSSE_NAMESPACE).setAttribute('xmlns:wsu', WSU_NAMESPACE);
            return this;
        }

        public RequestBuilder addBinarySecurityToken(String name, String certficateFormat) {
            Dom.XMLNode header = this.envelope.getChildElement('Header', SE_NAMESPACE);
            Dom.XMLNode security = header.getChildElement('Security', WSSE_NAMESPACE);
            
            security.addChildElement(name, WSSE_NAMESPACE, WSSE_PREFIX);
            security.getChildElement(name, WSSE_NAMESPACE).setAttribute('EncodingType', TOKEN_ENCODING_TYPE);
            security.getChildElement(name, WSSE_NAMESPACE).setAttribute('ValueType', TOKEN_VALUE_TYPE);
            security.getChildElement(name, WSSE_NAMESPACE).setAttribute('wsu:Id', certficateFormat + '-' + this.prefixId  + (this.postfixId-10));
            SecurityUtils.signatureValue('RSA-SHA1', this.doc, 'salesforce_test', ''); // 'BinarySecurityToken'
            
            return this;
        }

        public RequestBuilder addTimestamp(String name) {
            Datetime dateNow = Datetime.now();

            Dom.XMLNode header = this.envelope.getChildElement('Header', SE_NAMESPACE);
            Dom.XMLNode security = header.getChildElement('Security', WSSE_NAMESPACE);

            security.addChildElement(name, WSU_NAMESPACE, WSU_PREFIX);
            
            Dom.XMLNode timestamp = security.getChildElement(name, WSU_NAMESPACE);
            timestamp.setAttribute('wsu:Id', '_' + this.prefixId + this.postfixId);
            timestamp.addChildElement('Created', WSU_NAMESPACE, WSU_PREFIX).addTextNode(Utils.getUTCDateTime(dateNow.addHours(-2)));
            timestamp.addChildElement('Expires', WSU_NAMESPACE, WSU_PREFIX).addTextNode(Utils.getUTCDateTime(dateNow.addHours(2)));
            
            return this;
        }

        public RequestBuilder addAuthAttributes(String name, Map<String, String> authAttributes) {
            Dom.XMLNode header = this.envelope.getChildElement('Header', SE_NAMESPACE);
            header.addChildElement(name, SCH_NAMESPACE, SCH_PREFIX);
            header.getChildElement(name, SCH_NAMESPACE).setAttribute('wsu:Id', this.prefixId + (this.postfixId+1));
            header.getChildElement(name, SCH_NAMESPACE).setAttribute('xmlns:wsu', WSU_NAMESPACE);

            for (String key : authAttributes.keySet()) {
                header.getChildElement(name, SCH_NAMESPACE).addChildElement(key, null, null).addTextNode(authAttributes.get(key));
            }
            return this;
        }

        public RequestBuilder addActions(String methodRequest) {
            Dom.XMLNode header = this.envelope.getChildElement('Header', SE_NAMESPACE);
            Integer progressive = 2;

            for (String elem : actions) {
                header.addChildElement(elem, WSA_NAMESPACE, WSA_PREFIX);
                header.getChildElement(elem, WSA_NAMESPACE).setAttribute('soapenv:mustUnderstand', String.valueOf(1));
                header.getChildElement(elem, WSA_NAMESPACE).setAttribute('wsu:Id', this.prefixId + (this.postfixId+progressive));
                header.getChildElement(elem, WSA_NAMESPACE).setAttribute('xmlns:wsu', 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd');
                progressive+=1;
            }

            header.getChildElement('Action', WSA_NAMESPACE).
                addTextNode('http://www.sinfonia.campania.it/Schemas/AssistibileInAnagrafe/' + methodRequest);
            header.getChildElement('ReplyTo', WSA_NAMESPACE)
                .addChildElement('message', WSA_NAMESPACE, WSA_PREFIX)
                .addTextNode('http://www.w3.org/2005/08/addressing/anonymous');
            header.getChildElement('MessageID', WSA_NAMESPACE)
                .addTextNode('uuid:' + RandomUtils.generateRandomStringToLower(8) + '-' + RandomUtils.generateRandomStringToLower(4) + '-' + RandomUtils.generateRandomStringToLower(4) + '-' + RandomUtils.generateRandomStringToLower(4) + '-' + RandomUtils.generateRandomStringToLower(12));
            header.getChildElement('To', WSA_NAMESPACE)
                .addTextNode('https://sinfo-test.soresa.it/sinfonia/');

            return this;
        }

        public RequestBuilder addBodyContent(String method, Map<String, String> request) {
            Dom.XmlNode requestBody = createBodyMethod(method);
            requestBody.addChildElement('request', null, null);

            for (String key : request.keySet()) {
                requestBody.getChildElement('request', null).addChildElement(key, null, null).addTextNode(request.get(key));
            }

            return this;
        }

        private Dom.XmlNode createBodyMethod(String method) {
            Dom.XMLNode body = this.envelope.getChildElement('Body', SE_NAMESPACE);
            body.addChildElement(method, SCH_NAMESPACE, SCH_PREFIX);
            body.getChildElement(method, SCH_NAMESPACE).setAttribute('wsu:Id', this.prefixId + (this.postfixId+10));
            body.getChildElement(method, SCH_NAMESPACE).setAttribute('xmlns:wsu', WSU_NAMESPACE);
               
            return body.getChildElement(method, SCH_NAMESPACE);
        }

    }
}