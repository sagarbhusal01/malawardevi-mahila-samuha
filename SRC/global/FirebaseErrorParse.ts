export const FirebaseErrorParse = (FireaseMessage: string) => {
  switch (FireaseMessage) {
    case "Firebase: Error (auth/invalid-login-credentials).":
      return "तपाईं को पासवर्ड मिलेन";

    case "Firebase: Error (auth/invalid-email).":
      return "तपाईं को ईमेल मिलेन";

    case "Firebase: Error (auth/network-request-failed).":
      return "हजुर को मोबाईलमा नेट चलेको छैन";

    case "Firebase: Error (auth/missing-password).":
      return "कृपया पास्वर्ड खाली नराख्नु";

    case "Firebase: Error (auth/email-already-in-use).":
      return "ईमेल पहिले नै प्रयोगमा छ";

    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
      return "पास्वर्ड ६ अक्षर भन्दा बढी हुनु पर्छ";

    default:
      return FireaseMessage;
  }
};
