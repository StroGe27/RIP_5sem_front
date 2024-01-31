import "./TariffEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useTariff} from "../../hooks/tariffs/useTariff";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const TariffEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        tariff,
        fetchTariff,
        setName,
        setDescription,
        setRam,
        setSsd,
        setPrice,
        setImage
    } = useTariff()

    useEffect(() => {
        id && fetchTariff(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveTariff = async() => {
        let form_data = new FormData()

        form_data.append('name', tariff.name)
        form_data.append('description', tariff.description)
        form_data.append('ram', tariff.ram)
        form_data.append('ssd', tariff.ssd)
        form_data.append('price', tariff.price)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`tariffs/${tariff.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/tariffs/")
        }
    }

    const deleteTariff = async () => {

        const response = await api.delete(`tariffs/${tariff.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/tariffs/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (tariff == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={tariff.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={tariff.name} setValue={setName} />

                    <CustomTextarea placeholder="Описание" value={tariff.description} setValue={setDescription} />

                    <CustomInput placeholder="Объем оперативной памяти" value={tariff.ram} setValue={setRam} />

                    <CustomInput placeholder="Объем SSD хранилища" value={tariff.ssd} setValue={setSsd} />

                    <CustomInput placeholder="Цена" value={tariff.price} setValue={setPrice} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveTariff}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteTariff}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default TariffEditPage