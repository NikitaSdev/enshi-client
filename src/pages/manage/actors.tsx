import React from "react"

import ActorList from "@/screens/admin/actors/ActorList"

import { NextPageAuth } from "@/shared/types/auth.types"

const ActorsPage: NextPageAuth = () => {
	return <ActorList />
}
ActorsPage.isOnlyAdmin = true
export default ActorsPage
