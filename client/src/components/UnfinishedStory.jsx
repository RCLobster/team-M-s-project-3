import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

const UnfinishedStory = (title) => {
    return (
        <div>
            <button className="btn"  type="confirm">
                {title}
            </button>
        </div>
    )
};

export default UnfinishedStory;