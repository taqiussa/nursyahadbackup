import { arrayBulan } from '@/Functions/functions';
import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Bulan(
    { name, id, value, message, className, required, isFocused, handleChange, disabled },
    ref
) {

    const input = ref ? ref : useRef();
    const listBulan = arrayBulan()
    useEffect(() => {

        if (isFocused) {

            input.current.focus();

        }

    }, []);

    return (
        <div className='flex flex-col text-slate-600 capitalize'>
            <div>
                bulan
            </div>
            <div>
                <select
                    name={name}
                    id={id}
                    value={value}
                    className={
                        `border-gray-300  focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm w-full ${
                            disabled && 'bg-slate-200'
                        } ` +
                        className
                    }
                    ref={input}
                    required={required}
                    onChange={(e) => handleChange(e)}
                    disabled={disabled}
                >

                    <option value="">Pilih Bulan</option>

                    {listBulan.map((bulan, index) => (
                        <option key={index} value={bulan.value}>{bulan.name}</option>
                    ))}

                </select>
            </div>
            {message ?
                <div className='text-sm text-red-600'>
                    {message}
                </div>
                :
                null
            }
        </div>
    )
});
