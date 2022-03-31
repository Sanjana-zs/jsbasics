interface BankDetails {
    userName: string;
    accountNo: number | string;
    totalAmount: number | string;
    bankName: string;
}


// using classes
class User implements BankDetails {
    userName: string;
    accountNo: string | number;
    totalAmount: number;
    bankName: string;

    constructor(userName: string, accountNo: string | number, amount: number = 0, bankName: string = "State Bank") {
        this.userName = userName;
        this.accountNo = accountNo;
        this.totalAmount = amount;
        this.bankName = bankName;
    }

    show(): void {
        console.log(`\n${this.userName} whose account number is ${this.accountNo} has total balance of ${this.totalAmount} in ${this.bankName}\n`);
    }
}

const bankUser = new User("Sanjana", 6780981234);
bankUser.show();



// using objects
function showDetails(bankUser: BankDetails): void {
    console.log(`\n${bankUser.userName} whose account number is ${bankUser.accountNo} has total balance of ${bankUser.totalAmount} in ${bankUser.bankName}\n`);
}

showDetails({
    userName: "Aman",
    accountNo: 123546879,
    totalAmount: "123,755",
    bankName: "Axis Bank"
});