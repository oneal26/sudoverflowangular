class Post {
    _id:string;
    userName: string;
    title: string;
    content: string;
    vote: Number;
    comments: [];

    constructor(
        ){
            this.userName = ""
            this.title = ""
            this.content = ""
            this.vote = new Number
            this.comments = []
        }
}

export default Post;