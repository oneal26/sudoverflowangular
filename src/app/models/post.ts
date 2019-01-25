class Post {
    _id:string;
    userName: string;
    title: string;
    content: string;
    vote: number;
    comments: Array<any>;

    constructor(
        ){
            this.userName = ""
            this.title = ""
            this.content = ""
            this.vote = 0
            this.comments = []
        }
}

export default Post;