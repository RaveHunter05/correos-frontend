import { Budgets } from '~/types/types';
import BudgetInfo from './BudgetInfo';
import UpdateBudgetForm from './UpdateBudgetForm';
import BudgetComments from './BudgetComments';

import Cookies from 'js-cookie';
import { useState } from 'react';
import UpdateBudgetManagerForm from './UpdateBudgetManagerForm';

interface Interface {
    budget: Budgets;
    closeModal: () => void;
}

const ReviewBudget: React.FC<Interface> = ({ budget, closeModal }) => {
    //get role from Cookie
    const [role] = useState<string | undefined>(Cookies.get('role'));
    return (
        <>
            <section className="flex space-x-4">
                {role === 'Admin' && (
                    <article>
                        <UpdateBudgetForm
                            budget={budget}
                            closeModal={closeModal}
                        />
                    </article>
                )}

                {role === 'Boss' && (
                    <article>
                        <UpdateBudgetManagerForm
                            budget={budget}
                            closeModal={closeModal}
                        />
                    </article>
                )}
                <article>
                    <BudgetInfo budget={budget} />
                </article>
                <article>
                    <BudgetComments comments={budget.comments} />
                </article>
            </section>
        </>
    );
};

export default ReviewBudget;
