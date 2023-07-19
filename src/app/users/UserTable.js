import User from './User';

export default function UserTable({ users }) {
    const router = useRouter();
    const [expirationTime, setExpirationTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedExpirationTime = parseInt(localStorage.getItem('expiration')) * 1000;
            setExpirationTime(new Date(storedExpirationTime));
            setCurrentTime(Date.now());
        }
    }, []);

    useEffect(() => {
        // make a condition that compares exp and current time
        if (currentTime >= expirationTime) {
            handleLogout(); // Assuming you have defined this function somewhere
            alert('Session has ended. Please login to continue.');
            router.push('/users/login');
        }
    }, [router, currentTime, expirationTime]);

    const rows = users.map((user) => (
        <User user={user} key={user._id} />
    ));

    return (
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}