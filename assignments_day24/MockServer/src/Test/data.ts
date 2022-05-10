import { IBook, IFeed, IFetchReview, IUser } from "../constants/interface";

const books: IBook[] = [
    {
        "id": "5bb0f22a-d64b-41be-8436-18f82e859bb4",
        "title": "Javascript",
        "authId": "1d758928-b5fe-49bd-b34d-6433d751520d",
        "releaseDate": "2022-05-06T09:48:15.414Z",
        "description": "A true story"
    }
];

const users: IUser[] = [
    {
        "id": "1d758928-b5fe-49bd-b34d-6433d751520d",
        "userName": "sanju",
        "fullName": "Sanjana Sharma",
        "email": "sonu@gmail.com"
    }
]

const reviews: Record<string, IFetchReview[]> = {
    "5bb0f22a-d64b-41be-8436-18f82e859bb4": [
        {
            "id": "7ce9eb0d-8f08-4250-9cb0-6c9610f03b8f",
            "authId": "1d758928-b5fe-49bd-b34d-6433d751520d",
            "bookId": "b3501984-f08b-43db-a98d-6690231c03cf",
            "review": "Great Job",
            "createdAt": "2022-05-06T10:45:06.168Z"
        }
    ]
}

const feeds: IFeed[] = [
    {
        userInfo: {
            id: '1d758928-b5fe-49bd-b34d-6433d751520d',
            userName: 'sanju',
            fullName: 'Sanjana Sharma',
            email: 'sonu@gmail.com'
        },
        bookInfo: {
            id: '5bb0f22a-d64b-41be-8436-18f82e859bb4',
            title: 'Javascript',
            authId: '1d758928-b5fe-49bd-b34d-6433d751520d',
            releaseDate: '2022-05-06T09:48:15.414Z',
            description: 'A true story'
        },
        reviews: [
            {
                id: '7ce9eb0d-8f08-4250-9cb0-6c9610f03b8f',
                bookId: 'b3501984-f08b-43db-a98d-6690231c03cf',
                review: 'Great Job',
                createdAt: '2022-05-06T10:45:06.168Z',
                reviewerInfo: {
                    id: '1d758928-b5fe-49bd-b34d-6433d751520d',
                    userName: 'sanju',
                    fullName: 'Sanjana Sharma',
                    email: 'sonu@gmail.com'
                }
            }
        ]
    }
]

export { books, users, reviews, feeds };