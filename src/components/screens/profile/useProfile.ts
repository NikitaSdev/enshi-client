import { useRouter } from "next/router"
import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

import { IMovieEditInput } from "@/screens/admin/movie/movie-edit.interface"
import { IProfileInput } from "@/screens/profile/profile.interface"

import { MovieService } from "@/services/movie.service"
import { UsersService } from "@/services/users.service"

import { getKeys } from "@/utils/object/getKeys"
import { toastError } from "@/utils/toastError"

import { getAdminUrl } from "../../../config/url.config"

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const { isLoading } = useQuery(
		"userProfile",
		() => UsersService.getProfile(),
		{
			onSuccess: ({ data }) => {
				setValue("email", data.email)
			},

			onError: (error) => {
				toastError(error, "Get profile")
			}
		}
	)

	const { mutateAsync } = useMutation(
		"update profile",
		(data: IProfileInput) => UsersService.updateProfile(data),
		{
			onError: (error) => {
				toastError(error, "Get movies")
			},
			onSuccess: () => {
				toastr.success("Update movies", "Update was successful")
			}
		}
	)
	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateAsync(data)
	}
	return { onSubmit, isLoading }
}
