export interface NotificationType {
    notificationId:string,
    title: string,
    message: string,
    from: string,
    date: string, 
    position: string,
    type:NotificationEnum
}

export enum NotificationEnum{
    JobRecommendation = 1,
    MessageToEmployer = 2

}