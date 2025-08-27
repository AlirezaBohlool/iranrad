"use client";
import React, { useEffect } from "react";
import { Pet } from "@/services/api/petService";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Phone, Mail, MapPin, Calendar, User, PawPrint, Heart, Shield, FileText, Video, Image as ImageIcon, Home, Download, Play } from "lucide-react";
import { formatPersianDate } from "@/utils/dateUtils";
import Link from "next/link";
import { usePetFiles } from "@/hooks/usePetPublic";

interface QRPublicPageProps {
  pet: Pet | null;
  isLoading?: boolean;
  error?: string;
}

export default function QRPublicPage({ pet, isLoading, error }: QRPublicPageProps) {
  console.log("🚀 ~ QRPublicPage ~ pet:", pet)
  const { files, loading: filesLoading, error: filesError } = usePetFiles(pet);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <LoadingSpinner
          size="lg"
          text="در حال بارگذاری اطلاعات پت..."
          className="max-w-xl w-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">خطا در بارگذاری</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[var(--main-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--main-color-dark)] transition"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full text-center">
          <h1 className="text-2xl font-bold text-[var(--main-color)] mb-2">اطلاعات یافت نشد</h1>
          <p className="text-gray-600">متاسفانه اطلاعات مربوط به این کد در دسترس نیست.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-Morabba">
      {/* Header with Pet Image */}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">

          {/* Left Column */}
          <div className="space-y-6">

            {/* Section 1: Pet Characteristics */}
            <div className="bg-white rounded-lg ring-1 ring-gray-200 p-4">
              <h3 className="text-md font-bold text-[var(--main-color)] mb-3">مشخصات حیوان خانگی</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-500">تصویر پت</span>
                <div className="flex justify-start mb-4">
                  <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-[var(--main-color)]/20 shadow-lg">
                    {pet.photoPet ? (
                      <img
                        src={`https://provider.exmodules.org/api/v1/file-manager/preview/${pet.photoPet}`}
                        alt={pet.namePet}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src="/images/pet.jpg"
                        alt={pet.namePet}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <span className="text-gray-500">شماره بیمه</span><span className="text-gray-900">{pet.insuranceNumber || "تعیین نشده"}</span>
                <span className="text-gray-500">نام پت</span><span className="text-gray-900">{pet.namePet}</span>
                <span className="text-gray-500">نوع پت</span><span className="text-gray-900">{pet.typePet}</span>
                <span className="text-gray-500">نام نژاد</span><span className="text-gray-900">{pet.blood}</span>
                <span className="text-gray-500">جنسیت</span><span className="text-gray-900">{pet.sex === "MEN" ? "نر" : pet.sex === "WOMEN" ? "ماده" : "نامشخص"}</span>
                <span className="text-gray-500">تاریخ تولد</span><span className="text-gray-900">{formatPersianDate(pet.birthDate)}</span>
                <span className="text-gray-500">شماره شناسنامه</span><span className="text-gray-900">{pet.birthCertificateNumberPet}</span>
                <span className="text-gray-500">کد میکروچیپ</span><span className="text-gray-900">{pet.microChipCode}</span>
                <span className="text-gray-500">رنگ پت</span><span className="text-gray-900">{pet.colorPet}</span>
                <span className="text-gray-500">وزن</span><span className="text-gray-900">{pet.weightPet} کیلوگرم</span>
                <span className="text-gray-500">قد</span><span className="text-gray-900">{pet.heightPet} سانتی‌متر</span>
                <span className="text-gray-500">نام دامپزشک صادر کننده شناسنامه</span><span className="text-gray-900">{pet.issuingVeterinarian}</span>
                <span className="text-gray-500" >  نظام دامپزشکی صادر کننده شناسنامه
                </span><span className="text-gray-900">{pet.issuingMedicalSystem === "IRAN" ? "ایران" : pet.issuingMedicalSystem === "IRAN_RAD" ? "ایران راد" : "نامشخص"}</span>
              </div>
              {pet.distinctiveFeature && (
                <div className="mt-3 text-sm">
                  <div className="text-gray-700 font-semibold mb-1">ویژگی بارز ظاهری</div>
                  <div className="text-gray-700">{pet.distinctiveFeature}</div>
                </div>
              )}
            </div>

            {/* Section 2: Owner Information */}
            <div className="bg-white rounded-lg ring-1 ring-gray-200 p-4">
              <h3 className="text-md font-bold text-[var(--main-color)] mb-3">مشخصات سرپرست پت</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-500">نام و نام خانوادگی</span><span className="text-gray-900">{pet.nameHead}</span>
                <span className="text-gray-500">کد ملی</span><span className="text-gray-900">{pet.nationalCodeHead}</span>
                <span className="text-gray-500">موبایل (۱)</span><span className="text-gray-900">{pet.mobile1Head}</span>
                <span className="text-gray-500">موبایل (۲)</span><span className="text-gray-900">{pet.mobile2Head}</span>
                <span className="text-gray-500">تلفن ثابت</span><span className="text-gray-900">{pet.telHead}</span>
                <span className="text-gray-500">استان</span><span className="text-gray-900">{pet.stateHead}</span>
                <span className="text-gray-500">شهر</span><span className="text-gray-900">{pet.cityHead}</span>
                <span className="text-gray-500">آدرس</span><span className="text-gray-900">{pet.addressHead}</span>
                <span className="text-gray-500">کد پستی</span><span className="text-gray-900">{pet.postalCodeHead}</span>
                <span className="text-gray-500">ایمیل</span><span className="text-gray-900">{pet.emailHead}</span>
                {pet.telegramHead && (<><span className="text-gray-500">تلگرام</span><span className="text-gray-900">{pet.telegramHead}</span></>)}
                {pet.whatsAppHead && (<><span className="text-gray-500">واتساپ</span><span className="text-gray-900">{pet.whatsAppHead}</span></>)}
                {pet.instagramHead && (<><span className="text-gray-500">اینستاگرام</span><span className="text-gray-900">{pet.instagramHead}</span></>)}
                {pet.youtubeHead && (<><span className="text-gray-500">یوتیوب</span><span className="text-gray-900">{pet.youtubeHead}</span></>)}
                {pet.linkedinHead && (<><span className="text-gray-500">لینکدین</span><span className="text-gray-900">{pet.linkedinHead}</span></>)}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Section 3: Health Information */}
            <div className="bg-white rounded-lg ring-1 ring-gray-200 p-4">
              <h3 className="text-md font-bold text-[var(--main-color)] mb-3">ویژگی و اطلاعات سلامتی</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-500">دامپزشک عمومی</span><span className="text-gray-900">{pet.generalVeterinarian}</span>
                <span className="text-gray-500">آدرس دامپزشک عمومی</span><span className="text-gray-900">{pet.addressGeneralVeterinarian}</span>
                <span className="text-gray-500">تلفن دامپزشک عمومی</span><span className="text-gray-900">{pet.phoneNumberGeneralVeterinarian}</span>
                <span className="text-gray-500">دامپزشک متخصص</span><span className="text-gray-900">{pet.specialistVeterinarian}</span>
                <span className="text-gray-500">آدرس دامپزشک متخصص</span><span className="text-gray-900">{pet.addressSpecialistVeterinarian}</span>
                <span className="text-gray-500">تلفن دامپزشک متخصص</span><span className="text-gray-900">{pet.phoneNumberSpecialistVeterinarian}</span>
                <span className="text-gray-500">پت عقیم است</span><span className="text-gray-900">{pet.isSterile ? "بله" : "خیر"}</span>
                <span className="text-gray-500">واکسن Rabiel</span><span className="text-gray-900">{pet.vaccineRabiel ? "دارد" : "ندارد"}</span>
                <span className="text-gray-500">واکسن LDHPPi</span><span className="text-gray-900">{pet.vaccineLDHPPi ? "دارد" : "ندارد"}</span>
                <span className="text-gray-500">واکسن R.C.P</span><span className="text-gray-900">{pet.vaccineRCP ? "دارد" : "ندارد"}</span>
                <span className="text-gray-500">نوع تغذیه</span><span className="text-gray-900">{pet.typeFeeding}</span>
                <span className="text-gray-500">تعداد وعده‌های غذایی</span><span className="text-gray-900">{pet.numberMeal}</span>
              </div>
              <div className="mt-3 space-y-2 text-sm">
                {pet.diet && (<div><span className="font-semibold text-gray-700">رژیم غذایی:</span> <span className="text-gray-700">{pet.diet}</span></div>)}
                {pet.prohibitedFoodItems && (<div><span className="font-semibold text-gray-700">موارد ممنوع تغذیه:</span> <span className="text-gray-700">{pet.prohibitedFoodItems}</span></div>)}
                {pet.regularlyUsedMedications && (<div><span className="font-semibold text-gray-700">داروهای مصرفی دائم:</span> <span className="text-gray-700">{pet.regularlyUsedMedications}</span></div>)}
                {pet.prohibitedDrugs && (<div><span className="font-semibold text-gray-700">داروهای ممنوعه:</span> <span className="text-gray-700">{pet.prohibitedDrugs}</span></div>)}
                {pet.favoriteEncouragement && (<div><span className="font-semibold text-gray-700">تشویقی مورد علاقه:</span> <span className="text-gray-700">{pet.favoriteEncouragement}</span></div>)}
              </div>
            </div>

            {/* Section 4: Behavioral Information */}
            <div className="bg-white rounded-lg ring-1 ring-gray-200 p-4">
              <h3 className="text-md font-bold text-[var(--main-color)] mb-3">اطلاعات و ویژگی‌های رفتاری شخصیتی</h3>
              <div className="space-y-2 text-sm">
                {pet.behavioralHabits && (<div><span className="font-semibold text-gray-700">عادت‌های رفتاری:</span> <span className="text-gray-700">{pet.behavioralHabits}</span></div>)}
                {pet.susceptibility && (<div><span className="font-semibold text-gray-700">مهارت و استعدادها:</span> <span className="text-gray-700">{pet.susceptibility}</span></div>)}
                {pet.sensitivities && (<div><span className="font-semibold text-gray-700">حساسیت‌ها:</span> <span className="text-gray-700">{pet.sensitivities}</span></div>)}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-500">با پت دیگری زندگی می‌کند</span><span className="text-gray-900">{pet.connectOtherPets ? "بله" : "خیر"}</span>
                <span className="text-gray-500">با کودکان ارتباط دارد</span><span className="text-gray-900">{pet.connectWithBaby ? "بله" : "خیر"}</span>
              </div>
            </div>

            {/* Section 5: Consultations */}
            <div className="bg-white rounded-lg ring-1 ring-gray-200 p-4">
              <h3 className="text-md font-bold text-[var(--main-color)] mb-3">مشاوره‌ها</h3>
              <div className="space-y-2 text-sm">
                {pet.nutritionalCounseling && (<div><span className="font-semibold text-gray-700">مشاوره متخصص تغذیه:</span> <span className="text-gray-700">{pet.nutritionalCounseling}</span></div>)}
                {pet.expertVeterinaryCounseling && (<div><span className="font-semibold text-gray-700">مشاوره دامپزشک متخصص:</span> <span className="text-gray-700">{pet.expertVeterinaryCounseling}</span></div>)}
                {pet.trainingAdvice && (<div><span className="font-semibold text-gray-700">مشاوره تربیت پت:</span> <span className="text-gray-700">{pet.trainingAdvice}</span></div>)}
              </div>
            </div>

            {/* Section 6: Digital Documents */}
            <div className="bg-white rounded-lg ring-1 ring-gray-200 p-4">
              <h3 className="text-md font-bold text-[var(--main-color)] mb-3">اسناد دیجیتال</h3>

              {filesLoading && (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--main-color)]"></div>
                  <p className="text-sm text-gray-500 mt-2">در حال بارگذاری فایل‌ها...</p>
                </div>
              )}

              {filesError && (
                <div className="text-center py-4">
                  <p className="text-sm text-red-500">{filesError}</p>
                </div>
              )}


              <div className="space-y-4">
                {/* PDF Documents */}
                <div className="space-y-2">
                  {pet?.certificatePdfPet && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="text-[var(--main-color)]" size={20} />
                        <div>
                          <p className="font-medium text-gray-900">شناسنامه پت</p>
                          <p className="text-sm text-gray-500">{pet?.certificatePdfPet}</p>
                        </div>
                      </div>
                      <a
                        href={`https://provider.exmodules.org/api/v1/file-manager/preview/${pet?.certificatePdfPet}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[var(--main-color)] hover:text-[var(--main-color-dark)] transition-colors"
                      >
                        <Download size={16} />
                        <span className="text-sm">دانلود</span>
                      </a>
                    </div>
                  )}

                  {pet?.insurancePdfPet && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="text-[var(--main-color)]" size={20} />
                        <div>
                          <p className="font-medium text-gray-900">بیمه نامه</p>
                          <p className="text-sm text-gray-500">{pet?.insurancePdfPet}</p>
                        </div>
                      </div>
                      <a
                        href={`https://provider.exmodules.org/api/v1/file-manager/preview/${pet?.insurancePdfPet}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[var(--main-color)] hover:text-[var(--main-color-dark)] transition-colors"
                      >
                        <Download size={16} />
                        <span className="text-sm">دانلود</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Gallery Photos */}
                {(pet?.galleriesPhoto?.length ?? 0) > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <ImageIcon className="text-[var(--main-color)]" size={18} />
                      گالری عکس‌ها
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {pet?.galleriesPhoto?.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={`https://provider.exmodules.org/api/v1/file-manager/preview/${photo}`}
                      
                            alt={`عکس ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                            <a
                              href={`https://provider.exmodules.org/api/v1/file-manager/download/${photo}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2"
                            >
                              <ImageIcon size={16} className="text-gray-700" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery Videos */}
                {(pet?.galleriesVideo?.length ?? 0) > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Video className="text-[var(--main-color)]" size={18} />
                      گالری ویدیوها
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pet?.galleriesVideo?.map((video, index) => (
                        <div key={index} className="relative group">
                          <video
                            src={`https://provider.exmodules.org/api/v1/file-manager/preview/${video}`}
                            className="w-full h-32 object-cover rounded-lg border shadow-sm"
                            controls
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {video}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No files message */}
                {!pet?.certificatePdfPet && !pet?.insurancePdfPet && (pet?.galleriesPhoto?.length ?? 0) === 0 && (pet?.galleriesVideo?.length ?? 0) === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <FileText size={32} className="mx-auto mb-2 text-gray-300" />
                    <p>هیچ سند دیجیتالی موجود نیست</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Veterinary Contact Information */}
        <div className="mt-8 bg-white rounded-lg ring-1 ring-gray-200 p-4">
          <h3 className="text-md font-bold text-[var(--main-color)] mb-3">اطلاعات تماس دامپزشکان</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">دامپزشک صادرکننده شناسنامه</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="text-gray-500" size={16} />
                  <span className="text-gray-700">{pet.issuingVeterinarian}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-500" size={16} />
                  <span className="text-gray-700">{pet.addressVeterinarian}</span>
                </div>
                <div className="flex items_center gap-2">
                  <Phone className="text-gray-500" size={16} />
                  <span className="text-gray-700">{pet.phoneNumberVeterinarian}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">دامپزشک متخصص</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="text-gray-500" size={16} />
                  <span className="text-gray-700">{pet.specialistVeterinarian}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-500" size={16} />
                  <span className="text-gray-700">{pet.addressSpecialistVeterinarian}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-gray-500" size={16} />
                  <span className="text-gray-700">{pet.phoneNumberSpecialistVeterinarian}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ایران راد | تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </div>
  );
}
