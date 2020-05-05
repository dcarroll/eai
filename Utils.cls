public class Utils {
    
    public static String getUTCDateTime(DateTime dt){
        Datetime GMTDate = Datetime.newInstanceGmt(
                                dt.year(),
                                dt.month(),
                                dt.day(),
                                dt.hour(),
                                dt.minute(),
                                dt.second());
        GMTDate = GMTDate.addHours(-2);
        String dateNow = String.valueOf(GMTDate);
        dateNow = dateNow.replace(' ', 'T');
        dateNow += '.'+dt.millisecond()+'Z';
        return dateNow;

    }

}
