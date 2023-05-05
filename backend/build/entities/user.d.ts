export default class User {
    id: any;
    email: any;
    password: any;
    isValidPassword(password: any): Promise<boolean>;
    hashPassword(): Promise<void>;
}
//# sourceMappingURL=user.d.ts.map