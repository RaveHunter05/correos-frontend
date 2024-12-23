import { Typography } from 'antd';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeData } from '~/redux/reducers/data/dataSlice';
import { CostCenters } from '~/types/types';
import dayjs from 'dayjs';
import {
    createCostCenter,
    updateCostCenter,
} from '~/app/admin/costcenters/actions';
import { toast } from 'react-hot-toast';

interface Interface {
    toEditValues?: Partial<CostCenters> | null;
    closeModal: () => void;
}

const CreateCostCenterForm: React.FC<Interface> = ({
    toEditValues,
    closeModal,
}): React.ReactElement => {
    const [initialValues, setInitialValues] = useState<Partial<CostCenters>>({
        gerencyCode: '010',
        areaCode: '010',
        officeCode: '001000',
        code: '010010001000',
        name: 'PRESIDENCIA DE CORREOS',
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (toEditValues) setInitialValues(toEditValues);
    }, [toEditValues, initialValues]);

    const handleCreateCostCenter = async ({
        gerencyCode,
        areaCode,
        officeCode,
        code,
        name,
    }: Partial<CostCenters>) => {
        const date = dayjs().format('YYYY-MM-DD');

        const response = await createCostCenter({
            gerencyCode,
            areaCode,
            officeCode,
            code,
            name,
            date,
        });

        if (response) {
            toast.success('Centro de Costos Creado');
        }

        return response.data;
    };

    const handleUpdateCostCenter = async ({
        costCenterId,
        gerencyCode,
        areaCode,
        officeCode,
        code,
        name,
    }: Partial<CostCenters>) => {
        const date = dayjs().format('YYYY-MM-DD');

        const response = await updateCostCenter({
            costCenterId,
            gerencyCode,
            areaCode,
            officeCode,
            code,
            name,
            date,
        });

        toast.success('Centro de Costos Actualizado');

        return response.data;
    };

    const handleSubmit = async ({
        costCenterId,
        gerencyCode,
        areaCode,
        officeCode,
        code,
        name,
    }: Partial<CostCenters>) => {
        try {
            if (!toEditValues) {
                handleCreateCostCenter({
                    costCenterId,
                    gerencyCode,
                    areaCode,
                    officeCode,
                    code,
                    name,
                });
                return;
            }

            handleUpdateCostCenter({
                costCenterId,
                gerencyCode,
                areaCode,
                officeCode,
                code,
                name,
            });
            return;
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(changeData());
            closeModal();
        }
    };
    const CostCenterSchema = yup.object({
        gerencyCode: yup
            .string()
            .required('El código de gerencia es requerido'),
        areaCode: yup.string().required('El código de area es requerido'),
        officeCode: yup.string().required('El código de oficinaa es requerido'),
        code: yup.string().required('El código es requerido'),
        name: yup.string().required('El nombre es requerido'),
    });
    return (
        <>
            <Formik
                initialValues={toEditValues ? toEditValues : initialValues}
                onSubmit={handleSubmit}
                validationSchema={CostCenterSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="space-y-4 my-2 flex flex-col mt-4">
                            <section className="flex flex-col">
                                <Typography.Text className="font-bold text-blue-500">
                                    Código de Gerencia
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Código de Gerencia"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="gerencyCode"
                                />
                                {errors.gerencyCode && touched.gerencyCode && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.gerencyCode}
                                        </span>
                                    </div>
                                )}
                            </section>
                            <section className="flex flex-col">
                                <Typography.Text className="font-bold text-blue-500">
                                    Código de Area
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Código de Gerencia"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="areaCode"
                                />
                                {errors.areaCode && touched.areaCode && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.areaCode}
                                        </span>
                                    </div>
                                )}
                            </section>

                            <section className="flex flex-col">
                                <Typography.Text className="font-bold text-blue-500">
                                    Código de Oficinaa
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Código de Área"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="officeCode"
                                />
                                {errors.officeCode && touched.officeCode && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.officeCode}
                                        </span>
                                    </div>
                                )}
                            </section>
                            <section className="flex flex-col">
                                <Typography.Text className="font-bold text-blue-500">
                                    Código
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Código"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="code"
                                />
                                {errors.code && touched.code && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.code}
                                        </span>
                                    </div>
                                )}
                            </section>

                            <section className="flex flex-col">
                                <Typography.Text className="font-bold text-blue-500">
                                    Nombre
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Nombre"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="name"
                                />
                                {errors.name && touched.name && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.name}
                                        </span>
                                    </div>
                                )}
                            </section>

                            <div className="space-y-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    {toEditValues
                                        ? 'Editar Centro de Costos'
                                        : 'Agregar Centro de Costos'}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateCostCenterForm;
