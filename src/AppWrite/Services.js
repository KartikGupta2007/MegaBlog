import conf from "../Conf/conf";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    tablesDB;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId); 
        this.tablesDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    Title: title,
                    Content: content,
                    FeaturedImage: featuredImage, 
                    Status: status, 
                    UserId: userId
                }
            })
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async updatePost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: { 
                    Title: title,
                    Content: content, 
                    FeaturedImage: featuredImage, 
                    Status: status, 
                    UserId: userId
                }
            })
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async deletePost(slug){
        try{
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            })
            return true;
        }catch(error){
            console.log(error);
        }
    }

    async getSinglePost(slug){
        try{
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            })
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async getAllPosts(){
        try{
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries:[
                    Query.equal("Status", "active")
                ]
            })
        }
        catch(error){
            console.log(error)
            return null;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            })
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            })
        } catch (error) {
            console.log(error);
            return null;
            
        }
    }

    //very fast, no need to await, just return the url for the file preview
    previewFile(fileId){
        try {
            return this.bucket.getFileView({
                bucketId: conf.appwriteBucketId,
                fileId : fileId,
                permissions: ['read("any")']
            }).toString();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

const service = new Service();
export default service;