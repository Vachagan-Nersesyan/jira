import React from 'react'
import { auth } from '../../../firebase'
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'


import styles from '../styles/SignIn.module.css'
import { useNavigate } from 'react-router-dom'


const SignIn: React.FC<OwnProps> = ({ setLocalStorageHook }) => {

    const navigate = useNavigate()


    const authButtons = [
        {
            id: 1,
            title: 'Sign In With Google',
            image: '/pictures/authPictures/1.png'
        },
        {
            id: 2,
            title: 'Sign In With Github',
            image: '/pictures/authPictures/2.png'
        },
    ]


    const signInCompFunc: (id: number) => void = async (id: number) => {

        let provider = new GoogleAuthProvider()

        switch (id) {
            case 1: {

                provider = new GoogleAuthProvider()

                break
            }

            case 2: {

                provider = new GithubAuthProvider()

                break
            }


        }


        try {

            await signInWithPopup(auth, provider)

            localStorage.setItem('user', JSON.stringify(auth));
            setLocalStorageHook(true)

            navigate('/jiraItems/userPage')

        } catch (err) {
            console.log(err)
        }


    }


    return (
        <>
            {
                authButtons.map((val) => {
                    return (
                        <div className={styles.button_styles} onClick={() => signInCompFunc(val.id)}>
                            <div className={styles.button_title}>
                                {val.title}
                            </div>
                            <div className={styles.button_image}>
                                <img src={val.image} />
                            </div>
                        </div>
                    )
                })
            }
        </>
    )

}

export default SignIn

type OwnProps = {
    setLocalStorageHook: (type: boolean) => void

}