
export default function Modal(props: any) {
    const closeModel = () => {
        const { setTriggerSignupModal, setTriggerForgotpasswordModal } = props;
        if (setTriggerSignupModal) setTriggerSignupModal(false);
        if (setTriggerForgotpasswordModal) setTriggerForgotpasswordModal(false);
    }
    return (
        <main>
            <div className="w-screen h-screen fixed left-0 top-0 bg-gray-900 bg-opacity-50 flex">
                <div className="w-[700px] h-[500px] md:m-auto relative bg-white p-8 block mx-4 my-auto">
                    {/* modal close buton */}
                    <button onClick={() => closeModel()}
                        className="float-right mb-12 text-black">&#10005;</button>
                    {/* modal data */}
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
        </main>
    )
}
