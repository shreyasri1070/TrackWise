import { setExpense } from "@/redux/expenseSlice"
//import { EXPENSE_API_END_POINT } from "@/utils/endpoints"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetExpenses = () => {
    const dispatch = useDispatch();
    const { category, markAsDone } = useSelector(store => store.expense);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8000/api/v1/expense/getallexpenses?category=${category}&done=${markAsDone}`);
             
                if (res.data.success) {
                    dispatch(setExpense(res.data.expenses));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || 'Something went wrong');

            }
        }
        fetchExpenses();
    }, [dispatch, category, markAsDone]);
};
export default useGetExpenses;