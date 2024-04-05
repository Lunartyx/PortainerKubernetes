import logo from '../assets/logo.png'

const Navbar = () => {
    return (
        <>
            <nav className='flex'>
                <div className='basis-1/3'>
                    <img className='h-10 w-auto self-start' src={logo} alt='logo' />
                </div>
                <div className='basis-2/3'>
                    <li className='justify-items-center'>
                        <a>Home</a>
                        <a>KingdomsRise</a>
                        <a>Discord</a>
                        <a>Learner Lab</a>
                        <a>Help</a>
                    </li>
                </div>
            </nav>
        </>
    )
}

export default Navbar
