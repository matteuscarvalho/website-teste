import { useState, useEffect } from "preact/hooks";

interface PrivacyPolicyProps {
  Cookies?: string;
  PrivacyPolicyText?: string;
  PrivacyPolicyLink?: string;
  PrivacyPreferences?: string;
  Yourprivacy?: string;
  YourprivacyContent?: string;
  NecessaryCookies?: string;
  NecessaryCookiesContent?: string;
  AdvertisingCookies?: string;
  AdvertisingCookiesContent?: string;
  PerformanceCookies?: string;
  PerformanceCookiesContent?: string;
}
const Privacy = ({
  Cookies = "Usamos cookies para melhorar a sua experiência no site.  Ao continuar navegando, você concorda com a nossa",
  PrivacyPolicyText = "Política de Privacidade.",
  PrivacyPolicyLink = "/politica-de-privacidade",
  PrivacyPreferences = "Preferências de privacidade",
  Yourprivacy = "Sua privacidade",
  YourprivacyContent = "Conteúdo sua privacidade",
  NecessaryCookies = "Cookies estritamente necessários",
  NecessaryCookiesContent = "Conteúdo cookies estritamente necessários",
  AdvertisingCookies = "Cookies de publicidade",
  AdvertisingCookiesContent = "Conteúdo cookies de publicidade",
  PerformanceCookies = "Cookies de desempenho",
  PerformanceCookiesContent = "Conteúdo cookies de desempenho",
}: PrivacyPolicyProps) => {
  const [active, setActive] = useState("privacidade");
  const [modalActive, setModalActive] = useState(false);
  const [popupCookieActive, setPopupCookieActive] = useState(true);

  const [advertisingAccepted, setAdvertisingAccepted] = useState(false);
  const [performanceAccepted, setPerformanceAccepted] = useState(false);

  const handleSetActive = (value: string) => {
    setActive(value);
    console.log(value);
  };

  const handleAcceptCookies = () => {
    setModalActive(false);
    setPopupCookieActive(false);

    const cookieChoices = {
      advertising: true,
      performance: true,
      popupCookie: false,
    };

    localStorage.setItem("cookieChoices", JSON.stringify(cookieChoices));
  };

  const handleChoiceCookies = () => {
    setModalActive(false);
    setPopupCookieActive(false);

    const cookieChoices = {
      advertising: advertisingAccepted,
      performance: performanceAccepted,
      popupCookie: false,
    };

    localStorage.setItem("cookieChoices", JSON.stringify(cookieChoices));
  };

  const handleRejectAllCookies = () => {
    setModalActive(false);
    setAdvertisingAccepted(false);
    setPerformanceAccepted(false);
    setPopupCookieActive(false);

    const cookieChoices = {
      advertising: false,
      performance: false,
      popupCookie: false,
    };

    localStorage.setItem("cookieChoices", JSON.stringify(cookieChoices));
  };

  const handleSetChoiceCookies = (type: string, value: boolean) => {
    if (type === "advertising") {
      setAdvertisingAccepted(value);
    } else if (type === "performance") {
      setPerformanceAccepted(value);
    }
  };

  useEffect(() => {
    const storedChoicesString = localStorage.getItem("cookieChoices");
    const storedChoices = storedChoicesString
      ? JSON.parse(storedChoicesString)
      : {};

    if (storedChoices) {
      setAdvertisingAccepted(storedChoices.advertising);
      setPerformanceAccepted(storedChoices.performance);
      setPopupCookieActive(storedChoices.popupCookie);
    } else {
      setPopupCookieActive(true);
    }

    console.log("dwdwd");
  }, []);

  if (!popupCookieActive) {
    return <></>;
  }

  return (
    <>
      <div class="fixed w-full h-full overflow-hidden bg-black bg-opacity-50 top-0 bottom-0 left-0 z-999"></div>

      {modalActive && (
        <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-1001 rounded-lg flex w-700 max-w-700 flex-col items-center gap-8 shadow-md">
          <div class="flex w-full justify-between items-center px-4 py-2 border-b-[#eee] border-b border-solid text-[#797979]">
            <div className="logo">
              <img width="130" src="" alt="" />
            </div>
            <h3>{PrivacyPreferences}</h3>
            <div class="cursor-pointer" onClick={() => setModalActive(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#000"
                width="30"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div class="flex w-full justify-between gap-[30px] h-[400px] px-0 py-4 border-b-[#eee] border-b border-solid">
            <div class="flex-[0_1_220px] text-[#797979]">
              <ul class="m-0 p-0 list-none">
                <li
                  onClick={() => handleSetActive("privacidade")}
                  class={`items-center cursor-pointer text-lg pl-2.5 pr-0 py-2.5 ${
                    active === "privacidade"
                      ? `border-l-8 border-l-[#9f7dab] border-solid`
                      : ""
                  }`}
                >
                  {Yourprivacy}
                </li>
                <li
                  onClick={() => handleSetActive("necessarios")}
                  class={`items-center cursor-pointer text-lg pl-2.5 pr-0 py-2.5 ${
                    active === "necessarios"
                      ? `border-l-8 border-l-[#9f7dab] border-solid`
                      : ""
                  }`}
                >
                  {NecessaryCookies}
                </li>
                <li
                  onClick={() => handleSetActive("publicidade")}
                  class={`items-center cursor-pointer text-lg pl-2.5 pr-0 py-2.5 ${
                    active === "publicidade"
                      ? `border-l-8 border-l-[#9f7dab] border-solid`
                      : ""
                  }`}
                >
                  {AdvertisingCookies}
                </li>
                <li
                  onClick={() => handleSetActive("desempenho")}
                  class={`items-center cursor-pointer text-lg pl-2.5 pr-0 py-2.5 ${
                    active === "desempenho"
                      ? `border-l-8 border-l-[#9f7dab] border-solid`
                      : ""
                  }`}
                >
                  {PerformanceCookies}
                </li>
              </ul>
            </div>
            <div class="flex-1 text-[#797979]">
              {active === "privacidade" && (
                <div class="pl-0 pr-[18px] py-0">
                  <div class="flex justify-between">
                    <h3 class="m-0 p-0">{Yourprivacy}</h3>
                  </div>
                  <p>{YourprivacyContent}</p>
                </div>
              )}
              {active === "necessarios" && (
                <div class="pl-0 pr-[18px] py-0">
                  <div class="flex justify-between">
                    <h3 class="m-0 p-0">{NecessaryCookies}</h3>
                  </div>
                  <p>{NecessaryCookiesContent}</p>
                </div>
              )}
              {active === "publicidade" && (
                <div class="pl-0 pr-[18px] py-0">
                  <div class="flex justify-between">
                    <h3 class="m-0 p-0">{AdvertisingCookies}</h3>
                    <div class="">
                      <input
                        type="checkbox"
                        id="publicidade"
                        checked={advertisingAccepted}
                        onChange={(e) => {
                          if (e.target) {
                            const checkbox = e.target as HTMLInputElement;
                            handleSetChoiceCookies(
                              "advertising",
                              checkbox.checked
                            );
                          }
                        }}
                      />
                      <label htmlFor="publicidade">Toggle</label>
                    </div>
                  </div>
                  <p>{AdvertisingCookiesContent}</p>
                </div>
              )}
              {active === "desempenho" && (
                <div class="pl-0 pr-[18px] py-0">
                  <div class="flex justify-between">
                    <h3 class="m-0 p-0">{PerformanceCookies}</h3>
                    <div class="inline-flex">
                      <input
                        class="h-0 w-0 invisible"
                        type="checkbox"
                        id="desempenho"
                        checked={performanceAccepted}
                        onChange={(e) => {
                          if (e.target) {
                            const checkbox = e.target as HTMLInputElement;
                            handleSetChoiceCookies(
                              "performance",
                              checkbox.checked
                            );
                          }
                        }}
                      />
                      <label
                        class="bg-gray-100 cursor-pointer indent-[-9999px] w-[52px] h-7 block relative rounded-[100px] after:content-[''] after:absolute after:w-5 after:h-[19px] after:transition-[0.3s] after:rounded-[90px] after:left-[5px] after:top-[5px] active:after:w-5"
                        htmlFor="desempenho"
                      >
                        Toggle
                      </label>
                    </div>
                  </div>
                  <p>{PerformanceCookiesContent}</p>
                </div>
              )}
            </div>
          </div>
          <div class="flex justify-center items-center gap-2.5 px-0 py-4 ">
            <button
              class="bg-[#9f7dab] rounded text-white cursor-pointer p-2.5 border-[none] hover:bg-[#f71963] outline-none"
              onClick={handleChoiceCookies}
            >
              Confirmar minhas escolhas
            </button>
            <button
              class="bg-[#9f7dab] rounded text-white cursor-pointer p-2.5 border-[none] hover:bg-[#f71963] outline-none"
              onClick={handleRejectAllCookies}
            >
              Rejeitar todos
            </button>
            <button
              class="bg-[#9f7dab] rounded text-white cursor-pointer p-2.5 border-[none] hover:bg-[#f71963] outline-none"
              onClick={handleAcceptCookies}
            >
              Permitir todos
            </button>
          </div>
        </div>
      )}

      <div class="fixed bottom-0 right-0 w-full z-[9999]">
        <div class="border flex flex-col justify-around items-center gap-5 px-[42px] py-[22px] rounded-[10px] border-solid border-[#D0D0D0] shadow-[0px_0px_10px_5px_rgba(0,0,0,0.02)] bg-white md:flex-row">
          <div class="flex flex-col items-start">
            <span class="text-[#797979] text-base not-italic font-semibold leading-[17px]">
              Cookies
            </span>
            <p class="text-[#797979] text-base not-italic font-normal leading-[17px] m-0 p-0">
              {Cookies}{" "}
              <a
                class="text-[#496BC1] text-base not-italic font-bold leading-[17px] underline"
                href={PrivacyPolicyLink}
              >
                {PrivacyPolicyText}
              </a>
              .
            </p>
          </div>
          <div class="flex justify-center items-center gap-2.5 px-0 py-4">
            <button
              class="bg-[#9f7dab] rounded text-white cursor-pointer shrink-0 p-2.5 border-[none]"
              onClick={() => setModalActive(true)}
            >
              Definições de cookies
            </button>
            <button
              class="bg-[#9f7dab] rounded text-white cursor-pointer shrink-0 p-2.5 border-[none]"
              onClick={handleRejectAllCookies}
            >
              Rejeitar todos
            </button>
            <button
              class="bg-[#9f7dab] rounded text-white cursor-pointer shrink-0 p-2.5 border-[none]"
              onClick={handleAcceptCookies}
            >
              Aceitar todos os cookies
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
