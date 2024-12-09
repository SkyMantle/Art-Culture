import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProfilePageContainer from "@components/Blocks/ProfilePageContainer";
import API from "../../../utils/api.js";
import Loading from "@components/Blocks/Loading.jsx";
import LoadingError from "@components/Blocks/LoadingError.jsx";
import { useParams } from "react-router-dom";

const AdminArtTermsEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [artTerm, setArtTerm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await API.get("/art-term/" + id);
        setArtTerm(response.data?.artTerm);
      } catch (err) {
        console.error("Loading error:", err);
        setError(t("Помилка завантаження"));
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);
  return (
    <ProfilePageContainer>
      <h2>{t("Редагування терміна")}</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <LoadingError />
      ) : <div>
          
        </div>}
    </ProfilePageContainer>
  );
};

export default AdminArtTermsEdit;
