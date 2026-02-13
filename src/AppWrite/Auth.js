import conf from "../Conf/conf.js";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId); 
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}){
        try {
            const user = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name:name
            });
            if(user){
                return await this.account.login(email, password);
            }else{
                return user;
            }
        } 
        catch (error) {
            console.log(error);
            return null;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession({
                email: email,
                password: password
            });
        }
        catch(error){
            throw new Error(error);
        }
    }
    
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            console.log(error);
        }
    }
}

const authService = new AuthService();
export default authService;