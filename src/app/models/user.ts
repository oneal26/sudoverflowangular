class User {
    _id:string;
    userName: string;
    password: string;
    posts: [];

    constructor(
        ){
            this.userName = ""
            this.password = ""
            this.posts = []
        }
}

export default User;