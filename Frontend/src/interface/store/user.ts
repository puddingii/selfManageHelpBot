export interface UserLoginParam {
	userId: string
	passwd: string
}

export interface UserJoinParam extends UserLoginParam {
	nickname: string
	discordId?: string
}
