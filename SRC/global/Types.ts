export type UserDataTypes = {
  ID: number;
  Name: string;
  Address: string;
  Phone: number;
};

export type NewsType = {
  ID: string;
  Date: string;
  NewsData: string;
  isDeadLined: boolean;
};

export type MemberListType = {
  Name: string;
  Address: string;
  Phone: number;
  ID: number;
};

export type AllTransactionsListType = {
  ID: string;
  Amount: string;
  Date: string;
  Total: string;
  category: string;
  Duration: string;
  InterestRate: string;
  IsPaid: boolean;
  CreatedAt: Date;
  LoanDepositedAmount:string;
  LoanDepositedDate:string;
  Month:string;
  InterestPaid:string;
};



export type CatchMessagetype = {
  message: string;
  ErrorCode: string;
};

export type AllDepositTransactionsListTypeWithName = {
  Name: string;
  ID: string;
  Amount: string;
  Date: string;
  Total: string;
  category: string;
  CreatedAt: Date;
};

export type AllLoanTransactionsListTypeWithName = {
  Name: string;
  ID: string;
  Amount: string;
  Date: string;
  Total: string;
  category: string;
  CreatedAt: Date;
};
