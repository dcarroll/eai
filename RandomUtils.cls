public abstract class RandomUtils {
    
    public static Integer generateRandomNumber(Integer len) {
        Integer randomNumber = Integer.valueof((Math.random() * 100));
        String numberToString = String.valueOf(randomNumber);

        while (numberToString.length() < len) {
            numberToString += '0';
        }

        return Integer.valueOf(numberToString); 
    }

    public static String generateRandomString(Integer len) {
        final String chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        String randStr = '';
        while (randStr.length() < len) {
           Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length());
           randStr += chars.substring(idx, idx+1);
        }
        return randStr; 
    }

    public static String generateRandomStringToLower(Integer len) {
        final String chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        String randStr = '';
        while (randStr.length() < len) {
           Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length());
           randStr += chars.substring(idx, idx + 1);
        }
        return randStr; 
    }

}
