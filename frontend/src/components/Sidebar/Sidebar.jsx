import Button from "../Button/button"
import Avatar from "../../assets/avatar"

const Sidebar = () => {
    const fullname = localStorage.getItem('fullname');
    return (
        <div className="h-screen w-1/6 bg-white flex flex-col justify-between sticky top-0 border-r">
            <div>
                <div className="w-full h-fit flex flex-col items-center py-5 border-b border-slate-300">
                    <Avatar/>
                    <p className="font-semibold text-lg"><Button label={fullname} path={'/personal-info'}></Button></p>
                </div>
                <div>
                    <Button label={"Thông tin chi nhánh"} path={'/chi-nhanh'} className="w-full"/>
                    <Button label={"Thông tin phòng ban"} path={'/phong-ban'} className="w-full"/>
                    <Button label={"Thông tin dự án"} path={'/du-an'} className="w-full"/>
                    <Button label={"Thông tin nhân viên"} path={'/nhan-vien'} className="w-full"/>
                    <Button label={"Tính lương"} path={'/tinh-luong'} className='w-full'/>
                </div>
            </div>
            <div className="flex items-center border-t border-slate-300">
                <Button label={"Đăng xuất"} path={'/logout'}></Button>
            </div>
        </div>
    )
}

export default Sidebar