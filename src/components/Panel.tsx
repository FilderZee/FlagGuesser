
import PanelCSS from './Panel.module.css';
import DisplayData from './DisplayData.tsx';

const Panel = () => {

    return (
        <div className={PanelCSS.panel}>
            <DisplayData />
        </div>
    )

};
export default Panel;