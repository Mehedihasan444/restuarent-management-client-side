import { useParams } from "react-router-dom";

const PaymentFailed = () => {
    const {transactionId}=useParams()
    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-xl font-bold">Payment failed: {transactionId}</h1>
        </div>
    );
};

export default PaymentFailed;