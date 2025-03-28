import { useEffect, useState } from "react";
import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'
import styles from '@styles/components/UserProfile/CurrentPostReview.module.scss'
import Loading from "@components/Blocks/Loading.jsx";
import LoadingError from "@components/Blocks/LoadingError.jsx";
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import API from "../../../utils/api.js";
import { getFormattedDate, getFormattedTime } from "../../../utils/helper.js";

const CurrentPostReview = () => {
    const { t } = useTranslation()
	const { id } = useParams();
    const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(""); // Error state
    const navigate = useNavigate()

	useEffect(() => {
		async function fetchUserPosts() {
			try {
				const response = await API.get("/posts/" + id);
				setData(response.data);
			} catch (err) {
				setError(t("Помилка завантаження"));
			} finally {
				setLoading(false);
			}
		}

		fetchUserPosts();
	}, []);

    return (
        <ProfilePageContainer>
            <h2>
                {t('На розгляді')}
            </h2>
			{loading ? (
				<Loading />
				) : error ? (
				<LoadingError />
				) : data.length === 0 ? (
				<p>{t("Постів немає")}</p>
				) : (
				<>
            <div className={`${styles.PostContainer}`}>
                <div className={`${styles.LeftContainer}`}>
                    <div className={`${styles.AuthorContainer}`}>
                        <div className={`${styles.AuthorImageContainer}`}>
                            <img src={data.images} alt="avatar" width={300} />
                        </div>
                        <div className={`${styles.AuthorNameContainer}`}>
                            <h3>
                                {data.author.title}
                            </h3>
                        </div>
                    </div>
                    <div className={`${styles.DateContainer}`}>
                        <h4>
                            {getFormattedDate(data.updatedAt)} {getFormattedTime(data.updatedAt)}
                        </h4>
                    </div>
                </div>
                <div className={`${styles.RightContainer}`}>
                    <div className={`${styles.TitleContainer}`}>
                        <h2>
                            {data.title_uk} - {data.title_en}
                        </h2>
                    </div>
                    <div className={`${styles.DescriptionContainer}`}>
                        <p className={`${styles.DescriptionText}`}>
							{t('Опис')}
                        </p>
						<p>
							<span dangerouslySetInnerHTML={{__html: data.content_en}} />
						</p>
                    </div>
                    <div className={`${styles.DescriptionContainer}`}>
                        <p className={`${styles.DescriptionText}`}>
							{t('Опис')}
                        </p>
						<p>
							<span dangerouslySetInnerHTML={{__html: data.content_uk}} />
						</p>
                    </div>
                    <div className={`${styles.ButtonsContainer}`}>
                        <button
                            className={`${styles.Button} ${styles.AcceptButton}`}
                            onClick={() => navigate('/admin/accept-post')}
                        >
                            {t('Прийняти')}
                        </button>
                        <button
                            className={`${styles.Button} ${styles.RejectButton}`}
                            onClick={() => navigate('/admin/reject-post')}
                        >
                            {t('Відхилити')}
                        </button>
                    </div>
                </div>
            </div>
			</>
        )}
        </ProfilePageContainer>
    )
}

export default CurrentPostReview
