// Define an interface for the email structure
interface Email {
    id: string;
    from: {
      name: string;
    };
    subject: string;
    date: string;
    body: string;
    isRead: boolean;
    isFavourite: boolean;
  }
  