export interface ITdsDocuments {
    intUploadDocumentID: number,
    intUploadedUserType: number,
    vcFileUrl: string,
    vcFilename: string,
    vcType: string,
    vcUploadedOn: string,
    enableSwipe: boolean,
    fileType: string,
    fileDataType: string,
}

export interface ICustomerProject {
    customerProjectId: number,
    customerName: string,
    projectImage: string,
    projectName: string,
    userName: string,
}

export interface IBlogs {
    intProjectBlogID: number,
    vcBlogDate: string,
    vcCategory: string,
    vcDescription: string,
    Education: string,
    vcImageUrl: string,
    vcTitle: string,
    vcType: string,
}

export interface IVaultDocumentType {
    name: string,
    count: number,
    documentList: string,
}

export interface IVaultDocumentList {
    fileName: string,
    uploadedOn: string,
}

export interface IPaymentPendingData {
    vcTotalinvoiceraised: string,
    vcTotalinvoiceraisedconverted: string,
    vcTotaloutstanding: string,
    vcTotaloutstandingconverted: string,
    vcTotalreceived: string,
    vcTotalreceivedconverted: string,
}

export interface IPaymentFutureData {
    intTotalpendinginstallment: string,
    vcTotalamountpayable: string,
    vcTotalamountpayableconverted: string,
    customerPortal_SubFuturePaymentModelList: any,
}

export interface IRazorPayFinalPaymentResponseObj {
    razorpay_payment_id?: string,
    razorpay_order_id?: string,
    razorpay_signature?: string
}

export interface IRazorPayOrderMetadata {
    keyId?: string,
    keySecret?: string,
    orderId?: string
}

export interface IRazorPaySuccess {
    razorpay_payment_id: string,
    razorpay_order_id: string,
    razorpay_signature: string
}

export interface IRazorPayError {

}