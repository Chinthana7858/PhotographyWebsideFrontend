import { RxCross2 } from "react-icons/rx";
import { AiFillDelete} from "react-icons/ai";
import { MdPublish } from "react-icons/md";
import { IconBaseProps, IconType } from "react-icons/lib";
import { CgArrowUpR } from "react-icons/cg";

export function ChangeButton(){
    return(
        <div>
        <button className="text-white bg-blue-400 rounded-md xs:text-xs xs:p-1 md:text-sm md:p-2 sm:text-sm sm:p-2 hover:bg-blue-600">
            Update
        </button>
        </div>
    );
}
export function DELButton(){
    return(
        <div>
        <button className="text-white bg-red-400 rounded-md xs:text-xs xs:p-1 md:text-sm md:p-2 sm:text-sm sm:p-2 hover:bg-red-600">
            Delete
        </button>
        </div>
    );
}

export function DELButton2(){
    return(
        <div>
        <button className="text-white bg-red-400 rounded-md xs:text-xs xs:p-1 md:text-sm md:p-2 sm:text-sm sm:p-2 hover:bg-red-600">
        <AiFillDelete size="1em"/>
        </button>
        </div>
    );
}
export function SubmitButton(){
    return(
        <div>
        <button className="text-white bg-blue-400 rounded-md xs:text-xs xs:p-1 md:text-sm md:p-2 sm:text-sm sm:p-2 hover:bg-blue-600">
            Submit
        </button>
        </div>
    );
}


export function AddNewButton(){
    return(
        <div>
        <button className="text-white bg-blue-400 rounded-md xs:text-sm xs:p-2 md:text-md md:p-3 sm:text-md sm:p-3 hover:bg-blue-600">
            Add New
        </button>
        </div>
    );
}

export  function CloseButton() {
    return (
      <div>
        <button className=" p-1 text-sm font-semibold text-white bg-[#ce3a3a] rounded-sm hover:bg-[#bb2944]">
          <div className='flex'><span className="font-normal text-md"></span> <span className=''><RxCross2 size="1em"/></span> </div>
        </button>
      </div>
    )
}

export function ContinueWritingButton(){
    return(
        <div>
        <button className="text-white bg-blue-400 rounded-md xs:text-sm xs:p-2 md:text-md md:p-3 sm:text-md sm:p-3 hover:bg-blue-600">
            Continue Writing
        </button>
        </div>
    );
}
export function PublishButton(){
    return(
        <div>
        <button className="text-white bg-red-400 rounded-md xs:text-sm xs:p-2 md:text-md md:p-3 sm:text-md sm:p-3 hover:bg-red-600">
           <span className="flex"><span> Publish</span><span><MdPublish/></span></span> 
        </button>
        </div>
    );
}

interface ButtonProps {
    name: any;
    type?: any;
    buttonType: string;
    onClick?: () => void;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl-long';
    padding?: string;
    other?: any;
    icon?: IconType;
  }
  
  const Button: React.FunctionComponent<ButtonProps> = ({
    name,
    type = 'button',
    buttonType,
    onClick,
    size = 'md',
    padding = '3',
    icon: Icon = CgArrowUpR,
  }) => {
    let width;
    let buttonProperty;
  
    if (size === 'xs') {
      width = 'w-16';
    } else if (size === 'sm') {
      width = 'w-24';
    } else if (size === 'md') {
      width = 'w-38';
    } else if (size === 'lg') {
      width = 'w-52';
    } else if (size === 'xl') {
      width = 'w-72';
    } else if (size === 'xl-long') {
      width = 'w-[75%]';
    }
  
    if (buttonType === 'primary') {
      buttonProperty =
        'bg-cyan-700 text-white rounded-xl hover:bg-cyan-800 text-sm';
    }
    else if (buttonType === 'primary-red') {
          buttonProperty =
            'bg-red-700 text-white rounded-xl hover:bg-red-800 text-sm';
    } else if (buttonType === 'secondary') {
      buttonProperty =
        'bg-blue-700 hover:bg-blue-800 border rounded-lg text-white text-base';
    } else if (buttonType === 'secondary-red') {
      buttonProperty =
      'bg-red-700 hover:bg-red-800 border rounded-lg text-white text-base';
    }else if (buttonType === 'tab') {
      buttonProperty =
      'bg-sky-700 hover:bg-sky-900 text-white text-sm border rounded';
    }else if (buttonType === 'tab-red') {
      buttonProperty =
      'bg-red-700 hover:bg-red-900 text-white text-sm border rounded';
    }else if (buttonType === 'tab-green') {
      buttonProperty =
      'bg-green-500 hover:bg-green-700 text-white text-sm border rounded';
    }else if (buttonType === 'tab-indigo') {
      buttonProperty =
      'bg-indigo-500 hover:bg-indigo-700 text-white text-sm border rounded';
    }
    
  
    return (
      <button
        name={name}
        type={type}
        onClick={onClick}
        className={` ${buttonProperty} ${width} px-${padding} py-${padding}`}
      >
       <span className='flex'><span className='pl-3'> {name} </span><span className='px-3'><Icon size="1.5em"/></span></span>
      </button>
    );
  };
  
  export default Button;


