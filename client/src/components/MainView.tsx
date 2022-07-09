import MainVideo from "./MainVideo";
import RigthList from "./RigthList";
import style from "./style/style.module.css";

interface IMainViewProps { };


const MainView: React.FC<IMainViewProps> = (props) => {


    return (
        <div className={style.mainBox}>
            <div className={style.mainLeftList}>
                <div className={style.leftlistBox}>

                </div>                
            </div>

            <div className={style.mainCenterBox}>
                <MainVideo />
            </div>
            
            <div className={style.mainRigthList}>
                <RigthList />
            </div>
        </div>

    )

}

export default MainView;