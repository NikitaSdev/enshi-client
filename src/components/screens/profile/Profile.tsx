import React from "react"
import { useForm } from "react-hook-form"

import AuthField from "@/screens/auth/AuthField"
import { IProfileInput } from "@/screens/profile/profile.interface"
import { useProfile } from "@/screens/profile/useProfile"

import SkeletonLoader from "@/ui/SkeletonLoader"
import Button from "@/ui/form-elements/Button"
import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

import styles from "./Profile.module.scss"

const Profile = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: "onChange"
		})
	const { isLoading, onSubmit } = useProfile(setValue)
	return (
		<>
			<Meta title={"Профиль"}></Meta>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Heading title={"Профиль"} className={"mb-6"} />
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthField
						register={register}
						formState={formState}
						isPasswordRequired={false}
					/>
				)}
				<Button>Update</Button>
			</form>
		</>
	)
}

export default Profile
