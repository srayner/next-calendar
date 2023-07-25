import { redirect } from 'next/navigation';
import { format } from 'date-fns';

const Home = () => {

    const today = new Date();
    const todayUrl = '/' + format(today, 'yyyy/MM/dd') + '/year'; 

    redirect(todayUrl);
}

export default Home;
