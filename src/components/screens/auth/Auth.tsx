import { FC, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import AuthField from "@/screens/auth/AuthField"
import { IAuthInput } from "@/screens/auth/auth.interface"
import { useAuthRedirect } from "@/screens/auth/useAuthRedirect"

import Button from "@/components/ui/form-elements/Button"

import Heading from "@/ui/heading/Heading"

import { useActions } from "@/hooks/useActions"
import { useAuth } from "@/hooks/useAuth"

import Meta from "@/utils/meta/Meta"

import styles from "./Auth.module.scss"

const Auth: FC = () => {
	useAuthRedirect()
	const { isLoading } = useAuth()
	const [type, setType] = useState<"login" | "register">("login")
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset
	} = useForm<IAuthInput>({
		mode: "onChange"
	})

	const { login, register } = useActions()
	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type == "login") {
			login(data)
		} else if (type === "register") {
			register(data)
		}
		reset()
	}
	return (
		<>
			<Meta title={"Auth"} />
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title={"Вход | Регистрация"} className={"mb-12"} />
					<AuthField
						register={registerInput}
						formState={formState}
						isPasswordRequired
						isLogin={type}
					/>
					<div className={styles.buttons}>
						<Button
							type={"submit"}
							onClick={() => setType("login")}
							disabled={isLoading}
						>
							Войти
						</Button>
						<Button
							type={"submit"}
							onClick={() => setType("register")}
							disabled={isLoading}
						>
							Зарегистрироваться
						</Button>
					</div>
				</form>
			</section>
		</>
	)
}

export default Auth
