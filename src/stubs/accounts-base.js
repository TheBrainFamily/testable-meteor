const Accounts = {
  _generateStampedLoginToken() {
    return { token: 'fakeStampedLoginToken' };
  },
  _hashStampedToken(stampedToken) {
    return `hashed${stampedToken}`;
  },
  config() {},
  emailTemplates: {
    enrollAccount: {},
    resetPassword: {},
  },
  registerLoginHandler() {},
  createUser() { return { _id: 'testUserId' }; },
  sendEnrollmentEmail() {},
};

export { Accounts };
