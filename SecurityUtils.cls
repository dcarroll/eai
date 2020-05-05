public class SecurityUtils {
    public SecurityUtils() {
        
    }

    public static Blob digestValue(String algorithm, String value) {
        return Crypto.generateDigest(algorithm, Blob.valueOf(value));
    }

    // String algorithmName = 'RSA-SHA1';
    // decrypted private key pkcs8 format from certificate
    // String key = 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdAC6Oq16LfVt0yqATOEg8E0MXNrJVu8jsiSzyrPTTfxh0ttFeEV4SHQ8ac8AIG55Qh8+hAWJS6Pckv1xwoOqzR/UAUv+Xpck59t0+zCRosynapS47njdQiGZjpnslJhwt5WjzUdB4DtQqr1UYNMoXWONNTDkE7DF0ED+ytHhpccdWzi3bJkGGJWHB4BAc266LyjbGizTOgVmgVGunydxi2IEhNfuT7t/IM0KVdvh7oG06IwJcSvNVB9Jwn7IpANQ40SUfRA2CyfAGnnIQsD3D4g+da81tXDnfLDWP5VNKytCBCUmDw8DbNv6s5wTmOB0UvDPQprwRouT0q4qLpHdVAgMBAAECggEAWcXa2VWAMD6z5upd8d+C3mcdO87Y1lEUKLyfaPwg2jaYY1SODz3bDnxzQGrjaT9xnRarUKMb99CiUO7jCrvYuD7zBwZug+YWVACmrdvJDd00l4NQFmL3uiLkeSKe07Ug89Vz1332uE+yXd33yGmXDRaUkoR9LiVoebc41RSArbmpq2aP0nqpYVAYxRoEM73R+tPF7QVlNugYXRu2SGVUiWXyEidKL8yuWtZ4t+U72a+P4UHBdso1AIYyaTy+nxp/bryWTd64TtlsM+vFW9XAFH1U+12nLZKbWX9BbZ46utMCGk5x+LhnYar5PLjrA4e7tH3W9DK2aeEk7QBwIlCLgQKBgQD0uoZmxLM9YWST2RBGrCv+x3ePYlXiTEsME+i0hXXd8o0LYbRmHfH7CH2cema6fHEmuZZW/HV4lGuRdEnZ+15XVd8HaZpgRKZ4nEKsFwrmdNAKBgE04fxoiv/RH4KFbrvZteDNiO3IE78e1snIBRfd4VfH/zFHjKHJsjmyoRtu8QKBgQCkO0zaFeZDTpCdc/LEtum25PqJi+PEdFJfDlcBt/c+kR+Jo/PicYAjLXGOc/C5TB+651ZXWChcCIzuc9mDjUfG3Lcj6M8xjmjMSxWiJ2wfLjAjZiFcCYLCxvbT6+npyvfTmlZSNGUIyp83kT0rak8hEp5JdLtLlOys0nR8esFWpQKBgARSCq9jx5pMzt7BVUU6IuizksvIO6XsHOMQsuoE9Si+8HiD+BBZdP0ukDEkBA5Exiad3iaY/GXtkNyXhfpAMtEt5esWlTAf5iR49cBeA8Y/x7B1nK3XU4Jw+cUyXjaG1vAoAtj+EtyWZKhhuFw8osg7Aza3raIKvIx4Bga+S2KxAoGAeCWt5opI54qtf5MY0tLiDlxb8Y52tf1HWaU6/9XfOlWfFens/Qd9775KKiYlwNmxCOI/Jy0mcZYLzFLSmUwda52DGfEyyxVdE8AGdpeSoQkATJVl6FhI4kf+wTEA8nn7bkGlzwPnulPJwTQu5PkkJJTjWefdMcEkmJZqg7qmgMUCgYARA6LfJMFw5QQQ1amvjyHZsfmxGAKo36UWre53Ny5swMxgQVIwHTX4K6orzDhGT9w3sf55+qFQm8WLEbz74G2gUER2qRY9/Wuobt1MUn2yVYkUO1I3j0Rj43RafRzME1VmWtH8asnfNwn8ejR9aztZYAQwcL7PZ7hyS9ofiR9lfQ==';
    public static Dom.Document signatureValue(String algorithmName, Dom.Document doc, String certificateName, String nodeName) {
        // Dom.XmlNode securityNode = doc.getRootElement().getChildElement('Header', namespace).getChildElement('Security', wsse).getChildElement(nodeName, wsse);
        System.debug(LoggingLevel.ERROR, doc.getRootElement().getName());
        // System.debug(LoggingLevel.ERROR, securityNode);
        Crypto.signXml(algorithmName, doc.getRootElement(), null, certificateName);
        return doc;
    }


}
