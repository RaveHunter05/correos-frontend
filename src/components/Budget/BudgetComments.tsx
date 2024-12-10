import { Card } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { Comments } from '~/types/types';

interface Interface {
    comments: Comments[] | undefined;
}

const BudgetComments: React.FC<Interface> = ({ comments }) => {
    return (
        <>
            <Card title="Comentarios" className="mb-4 bg-yellow-300">
                {!comments?.length && <p>Aún no hay comentarios</p>}
                {comments?.map((comment) => (
                    <div
                        key={comment.commentId}
                        className="mb-2 p-2 bg-white rounded border-white"
                    >
                        <p className="text-sm font-semibold">
                            {comment.creatorUsername}
                        </p>

                        <p className="text-sm">
                            <span className="font-semibold">Razón:</span>{' '}
                            {comment.reason}
                        </p>

                        <p className="text-sm">
                            <span className="font-semibold">Fecha:</span>{' '}
                            {dayjs(comment.date).format('DD/MM/YYYY')}
                        </p>

                        <p className="text-sm">
                            <span className="font-semibold">Creador:</span>{' '}
                            {comment.creatorUsername || comment.createdById}
                        </p>
                        <p className="text-sm">{comment.commentText}</p>
                    </div>
                ))}
            </Card>
        </>
    );
};

export default BudgetComments;
