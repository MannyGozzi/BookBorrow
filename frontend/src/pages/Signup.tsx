import React from 'react'
import ThemedHeader from '../components/ThemedHeader'
import {Signup as SignupComp} from '../components/Signup'
import DocTitle from '../components/DocTitle'

const Signup = () => {
    DocTitle("Signup Page | Boobo")
    return (
        <section>
            <SignupComp />
        </section>
    )
}

export default Signup