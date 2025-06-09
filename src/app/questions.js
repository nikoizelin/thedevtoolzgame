import React from "react";

const Questions = ({question, questionContent, index}) => {

    return (
        <div>
            <div className="relative max-w-[740px] mt-12 mx-auto">
                <div className="label-for-input text-2xl">
                    <span>{index}. {question}</span>
                </div>
                <div id="class" className="border-2 border-gray-800 rounded-md flex items-center justify-center h-full p-12">
                    <div className="text-black text-2xl">
                        {questionContent}
                    </div>
                </div>
            </div>
        </div>
    )
    ;
}

export default Questions; 