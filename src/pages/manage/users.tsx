import { NextPage } from "next"

import UserList from "@/screens/admin/users/UserList"

import { NextPageAuth } from "@/shared/types/auth.types"

const UsersPage: NextPageAuth = () => {
	return <UserList />
}
UsersPage.isOnlyAdmin = true
export default UsersPage
