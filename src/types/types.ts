export type Users = {
    id: string;
    email: string;
    userName: string;
    isActive: boolean;
    password: string;
    role: string;
    date: Date | string;
};

export type NewPasswordUser = {
    email: string;
    newPassword: string;
};

export type Roles = {
    id: string;
    name: string;
    normalizedName: string;
};

export type UserRegister = {
    email: string;
    password: string;
};

export type Incomes = {
    incomeId: string;
    service: Partial<Services>;
    costCenter: Partial<CostCenters>;
    projectedAmount: number;
    executedAmount: number;
    date: Date | string;
};

export type UploadIncomes = {
    incomeId: any;
    serviceId: string;
    costCenterId: string;
    projectedAmount: number;
    executedAmount: number;
    date: Date | string;
};

export type Expenses = {
    expenseId: string;
    costCenter: Partial<CostCenters>;
    spent: Partial<Spents>;
    projectedAmount: number;
    executedAmount: number;
    date: Date | string;
};

export type UploadExpenses = {
    expenseId: string;
    costCenterId: string;
    spentId: string;
    projectedAmount: number;
    executedAmount: number;
    date: Date | string;
};

export type CostCenters = {
    costCenterId: string;
    gerencyCode: string;
    areaCode: string;
    officeCode: string;
    code: string;
    name: string;
    date: Date | string;
};

export type Services = {
    serviceId: string;
    code: string;
    name: string;
    date: Date | string;
};

export type Spents = {
    spentId: string;
    category: string;
    denomination: string;
    date: Date | string;
};

export type ColumnHeader = {
    title: string;
    dataIndex: string;
};
