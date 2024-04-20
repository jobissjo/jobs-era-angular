export interface NotificationType {
    notificationType: string;
    title: string;
    message: string;
    jobId: string;
    position: string;
    companyName: string;
    deleteOrResponded: string[];
    userId:string;
    
}
export interface ResponseNotification extends NotificationType{
    id: string;
    createdDate: string;
}
