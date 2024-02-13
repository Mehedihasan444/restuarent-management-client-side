import { useParams } from "react-router-dom";


const PaymentSuccess = () => {
    const {transactionId}=useParams()
    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-xl font-bold">Payment complete: {transactionId}</h1>
        </div>
    );
};

export default PaymentSuccess;