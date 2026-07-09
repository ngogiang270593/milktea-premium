import TeaBar01 from '../assets/images/testimonials/tea-bar-01.jpg';
import TeaBar02 from '../assets/images/testimonials/tea-bar-02.jpg';
import TeaBar03 from '../assets/images/testimonials/tea-bar-03.jpg';
import TeaBar04 from '../assets/images/testimonials/tea-bar-04.jpg';

export const DEFAULT_SITE_LANGUAGE = 'vi';
export const SITE_CONFIG_STORAGE_KEY = 'milktea-site-config';

export const siteConfig = {
  brand: {
    name: 'MilkTea Premium',
    legalName: 'MilkTea Premium LLC',
    logoText: 'MP',
    handle: '@milkteapremium'
  },
  business: {
    copyrightYear: 2026,
    email: 'support@milkteapremium.com',
    phone: '+1 (800) 555-0199',
    address: {
      en: 'New York, NY',
      vi: 'New York, NY'
    },
    openingHours: {
      en: 'Daily, 8:00 AM - 10:00 PM',
      vi: 'Hằng ngày, 8:00 - 22:00'
    }
  },
  social: {
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
    tiktok: 'https://www.tiktok.com',
    youtube: 'https://www.youtube.com'
  },
  seo: {
    en: {
      title: 'MilkTea Premium | Handcrafted Bubble Tea',
      description: 'MilkTea Premium offers a modern bubble tea experience with handcrafted blends, premium ingredients, and elegant presentation.'
    },
    vi: {
      title: 'MilkTea Premium - Trà sữa cao cấp',
      description: 'MilkTea Premium - Trà sữa cao cấp, nguyên liệu tuyển chọn, giao hàng nhanh, trải nghiệm thưởng thức tuyệt hảo.'
    }
  },
  content: {
    en: {
      home: {
        hero: {
          eyebrow: 'Premium Bubble Tea',
          title: 'Enjoy Every Sip.',
          subtitle: 'Handcrafted milk tea, slow-brewed leaves, silky cream, and jewel-like pearls made for a calmer, richer daily ritual.',
          primaryCta: 'Explore Menu',
          secondaryCta: 'Order Signature',
          stats: {
            cupsValue: '42k+',
            cups: 'Cups served',
            blendsValue: '18',
            blends: 'Tea blends',
            brewValue: '12h',
            brew: 'Cold brew'
          },
          ratingTitle: '4.9/5 customer love',
          ratingMeta: '2,400+ verified tea moments',
          visualAria: 'Illustration of a premium bubble tea drink with brown sugar pearls and cream topping',
          toppings: {
            pearls: {
              title: 'Brown Sugar Pearls',
              description: 'Slow simmered daily'
            },
            cream: {
              title: 'Cloud Cream',
              description: 'Velvet finish'
            }
          },
          freshBatch: 'Fresh batch',
          freshBatchTime: '11:30 AM'
        },
        categories: {
          eyebrow: 'Shop by category',
          title: 'Choose your next premium treat.',
          copy: 'Swipe, tap, or browse our signature families crafted for milk tea lovers, coffee guests, and dessert pairings.',
          sideCopy: 'Interactive category cards highlight product depth and make mobile discovery feel as smooth as the first sip.',
          items: [
            {
              value: 'milk-tea',
              count: 24,
              icon: 'MilkTea',
              toneClass: 'from-[#0d3b2e] to-[#2f6b58]',
              title: 'Milk Tea',
              description: 'Velvety classics and brown sugar signatures.'
            },
            {
              value: 'fruit-tea',
              count: 18,
              icon: 'FruitTea',
              toneClass: 'from-[#f8c3b6] to-[#d86f5d]',
              title: 'Fruit Tea',
              description: 'Bright citrus, berry, mango, and popping pearls.'
            },
            {
              value: 'coffee',
              count: 12,
              icon: 'Coffee',
              toneClass: 'from-[#6f4329] to-[#2f2419]',
              title: 'Coffee',
              description: 'Tea bar espresso blends with creamy foam.'
            },
            {
              value: 'smoothie',
              count: 16,
              icon: 'Smoothie',
              toneClass: 'from-[#cdebf6] to-[#62a8b8]',
              title: 'Smoothie',
              description: 'Cold, silky fruit blends for slower afternoons.'
            },
            {
              value: 'cake',
              count: 10,
              icon: 'Cake',
              toneClass: 'from-[#d3a86a] to-[#b7793f]',
              title: 'Cake',
              description: 'Soft patisserie pairings for every tea order.'
            },
            {
              value: 'topping',
              count: 22,
              icon: 'Topping',
              toneClass: 'from-[#e7f8f6] to-[#1f7665]',
              title: 'Topping',
              description: 'Pearls, jellies, foam, pudding, and crunch.'
            }
          ]
        },
        featured: {
          eyebrow: 'Featured products',
          title: 'Premium picks, ready for your cart.',
          copy: 'Image-led product cards with instant favorite, quick view, discounts, ratings, and polished cart actions.',
          labels: {
            classic: 'classic',
            fruit: 'fruit',
            matcha: 'matcha',
            smoothie: 'smoothie'
          },
          items: {
            'midnight-milk-tea': {
              title: 'Midnight Milk Tea',
              description: 'Velvet black tea with brown sugar boba, cream foam, and a subtle caramel note.',
              badge: 'Best Seller'
            },
            'tropical-hibiscus': {
              title: 'Tropical Hibiscus',
              description: 'Bright hibiscus with pineapple, passionfruit, and popping lemonade pearls.',
              badge: 'Seasonal'
            },
            'vanilla-matcha-dream': {
              title: 'Vanilla Matcha Dream',
              description: 'Silky matcha with house vanilla, oat milk, and a gold dust finish.',
              badge: 'Premium'
            },
            'strawberry-cloud-smoothie': {
              title: 'Strawberry Cloud Smoothie',
              description: 'Fresh strawberry blend with yogurt cream, crystal pearls, and a soft vanilla finish.',
              badge: 'New'
            }
          }
        },
        promotion: {
          eyebrow: 'Limited Time',
          title: 'Summer Sip Pass: 2 for 1 on select drinks.',
          copy: 'Refresh your routine with two premium teas for the price of one. Available in-store and pickup for a limited season.',
          cta: 'Claim your pass'
        },
        testimonials: {
          eyebrow: 'Testimonials',
          title: 'Loved by bubble tea fans everywhere.',
          items: [
            {
              name: 'Sophie H.',
              quote: 'The Premium collection feels luxurious yet comforting. Every cup is a beautiful treat.',
              rating: '5.0'
            },
            {
              name: 'Daniel P.',
              quote: 'The perfect blend of modern design and delicious drinks. The matcha latte is unforgettable.',
              rating: '5.0'
            },
            {
              name: 'Ava W.',
              quote: 'Elegant flavors and attentive service. This feels like a true premium tea destination.',
              rating: '5.0'
            }
          ]
        },
        instagram: {
          eyebrow: 'Instagram',
          title: 'Aesthetic moments from our tea bar.',
          follow: 'Follow @milkteapremium',
          followAria: 'Follow MilkTea Premium on Instagram',
          items: [
            { label: 'Tokyo-inspired bubble tea', src: TeaBar01 },
            { label: 'Refreshing summer flavor', src: TeaBar02 },
            { label: 'Minimal premium cafe', src: TeaBar03 },
            { label: 'Styled tea and pearls', src: TeaBar04 }
          ]
        },
        newsletter: {
          eyebrow: 'Newsletter',
          title: 'Stay in the loop with premium tea updates.',
          copy: 'Receive new menu drops, seasonal offers, and exclusive tasting events direct to your inbox.',
          placeholder: 'you@example.com'
        }
      },
      footer: {
        tagline: 'Crafted tea experiences for curious palates, inspired by clean design and premium flavors.',
        copyright: 'Designed for premium bubble tea lovers.'
      },
      search: {
        placeholder: 'Search milk tea, matcha, coffee...',
        emptyCopy: 'Try searching for milk tea, matcha, fruit tea, coffee, or toppings.'
      },
      orderSuccess: {
        title: 'Thank you for choosing MilkTea Premium.',
        orderNumber: 'Order number: MT-2026-001',
        copy: 'This frontend order state is ready for backend integration. Live order numbers and status updates can be connected later.'
      }
    },
    vi: {
      home: {
        hero: {
          eyebrow: 'Trà sữa cao cấp',
          title: 'Tận hưởng từng ngụm.',
          subtitle: 'Trà sữa thủ công từ lá trà ủ chậm, kem sữa mịn và trân châu dẻo thơm, tạo nên một khoảnh khắc thưởng thức tinh tế mỗi ngày.',
          primaryCta: 'Khám phá thực đơn',
          secondaryCta: 'Đặt món đặc trưng',
          stats: {
            cupsValue: '42k+',
            cups: 'Ly đã phục vụ',
            blendsValue: '18',
            blends: 'Công thức trà',
            brewValue: '12h',
            brew: 'Ủ lạnh'
          },
          ratingTitle: '4.9/5 được yêu thích',
          ratingMeta: '2.400+ trải nghiệm đã xác thực',
          visualAria: 'Minh họa ly trà sữa cao cấp với trân châu đường nâu và lớp kem mịn',
          toppings: {
            pearls: {
              title: 'Trân châu đường nâu',
              description: 'Nấu chậm mỗi ngày'
            },
            cream: {
              title: 'Kem mây',
              description: 'Mềm mịn như nhung'
            }
          },
          freshBatch: 'Mẻ mới',
          freshBatchTime: '11:30'
        },
        categories: {
          eyebrow: 'Mua theo danh mục',
          title: 'Chọn món ngon cao cấp tiếp theo.',
          copy: 'Lướt, chạm hoặc khám phá những dòng thức uống đặc trưng dành cho tín đồ trà sữa, cà phê và món ngọt đi kèm.',
          sideCopy: 'Thẻ danh mục tương tác giúp bạn nhìn nhanh độ phong phú của thực đơn và khám phá dễ dàng trên di động.',
          items: [
            {
              value: 'milk-tea',
              count: 24,
              icon: 'MilkTea',
              toneClass: 'from-[#0d3b2e] to-[#2f6b58]',
              title: 'Trà sữa',
              description: 'Những vị trà sữa béo mịn và đường nâu đặc trưng.'
            },
            {
              value: 'fruit-tea',
              count: 18,
              icon: 'FruitTea',
              toneClass: 'from-[#f8c3b6] to-[#d86f5d]',
              title: 'Trà trái cây',
              description: 'Cam chanh, dâu, xoài tươi mát cùng trân châu nổ.'
            },
            {
              value: 'coffee',
              count: 12,
              icon: 'Coffee',
              toneClass: 'from-[#6f4329] to-[#2f2419]',
              title: 'Cà phê',
              description: 'Cà phê pha kiểu tea bar với lớp kem béo mượt.'
            },
            {
              value: 'smoothie',
              count: 16,
              icon: 'Smoothie',
              toneClass: 'from-[#cdebf6] to-[#62a8b8]',
              title: 'Smoothie',
              description: 'Sinh tố trái cây lạnh, mịn và nhẹ nhàng cho buổi chiều.'
            },
            {
              value: 'cake',
              count: 10,
              icon: 'Cake',
              toneClass: 'from-[#d3a86a] to-[#b7793f]',
              title: 'Bánh ngọt',
              description: 'Bánh mềm tinh tế để dùng kèm mọi ly trà.'
            },
            {
              value: 'topping',
              count: 22,
              icon: 'Topping',
              toneClass: 'from-[#e7f8f6] to-[#1f7665]',
              title: 'Topping',
              description: 'Trân châu, thạch, kem cheese, pudding và hạt giòn.'
            }
          ]
        },
        featured: {
          eyebrow: 'Sản phẩm nổi bật',
          title: 'Lựa chọn cao cấp, sẵn sàng vào giỏ.',
          copy: 'Thẻ sản phẩm trực quan với yêu thích nhanh, xem nhanh, ưu đãi, đánh giá và thao tác thêm giỏ mượt mà.',
          labels: {
            classic: 'truyền thống',
            fruit: 'trái cây',
            matcha: 'matcha',
            smoothie: 'smoothie'
          },
          items: {
            'midnight-milk-tea': {
              title: 'Trà sữa Đêm Đen',
              description: 'Trà đen mượt mà cùng trân châu đường nâu, kem foam và nốt caramel dịu nhẹ.',
              badge: 'Bán chạy'
            },
            'tropical-hibiscus': {
              title: 'Hibiscus Nhiệt Đới',
              description: 'Hibiscus rực rỡ với dứa, chanh dây và trân châu nổ vị lemonade.',
              badge: 'Theo mùa'
            },
            'vanilla-matcha-dream': {
              title: 'Vanilla Matcha Mơ Màng',
              description: 'Matcha mịn với vanilla nhà làm, sữa yến mạch và lớp ánh vàng tinh tế.',
              badge: 'Cao cấp'
            },
            'strawberry-cloud-smoothie': {
              title: 'Smoothie Dâu Mây',
              description: 'Dâu tươi xay cùng kem yogurt, trân châu thủy tinh và hậu vị vanilla mềm.',
              badge: 'Mới'
            }
          }
        },
        promotion: {
          eyebrow: 'Ưu đãi giới hạn',
          title: 'Summer Sip Pass: mua 1 tặng 1 cho đồ uống chọn lọc.',
          copy: 'Làm mới thói quen thưởng thức với hai ly trà cao cấp chỉ với giá một ly. Áp dụng tại cửa hàng và đơn nhận mang đi trong mùa này.',
          cta: 'Nhận ưu đãi'
        },
        testimonials: {
          eyebrow: 'Đánh giá',
          title: 'Được yêu thích bởi những người mê trà sữa.',
          items: [
            {
              name: 'Sophie H.',
              quote: 'Bộ sưu tập Premium vừa sang trọng vừa dễ chịu. Mỗi ly đều là một món quà nhỏ đầy tinh tế.',
              rating: '5.0'
            },
            {
              name: 'Daniel P.',
              quote: 'Sự kết hợp hoàn hảo giữa không gian hiện đại và đồ uống ngon. Matcha latte thật sự khó quên.',
              rating: '5.0'
            },
            {
              name: 'Ava W.',
              quote: 'Hương vị thanh lịch và phục vụ chu đáo. Đây đúng là một điểm đến trà sữa cao cấp.',
              rating: '5.0'
            }
          ]
        },
        instagram: {
          eyebrow: 'Instagram',
          title: 'Những khoảnh khắc đẹp từ quầy trà.',
          follow: 'Theo dõi @milkteapremium',
          followAria: 'Theo dõi MilkTea Premium trên Instagram',
          items: [
            { label: 'Trà sữa lấy cảm hứng từ Tokyo', src: TeaBar01 },
            { label: 'Hương vị mùa hè tươi mát', src: TeaBar02 },
            { label: 'Không gian cafe cao cấp tối giản', src: TeaBar03 },
            { label: 'Trà và trân châu được tạo hình tinh tế', src: TeaBar04 }
          ]
        },
        newsletter: {
          eyebrow: 'Nhận ưu đãi',
          title: 'Cập nhật những hương vị trà cao cấp mới nhất.',
          copy: 'Nhận thông tin món mới, ưu đãi theo mùa và sự kiện thử vị độc quyền ngay trong hộp thư của bạn.',
          placeholder: 'ban@example.com'
        }
      },
      footer: {
        tagline: 'Trải nghiệm trà thủ công dành cho khẩu vị tinh tế, lấy cảm hứng từ thiết kế tối giản và hương vị cao cấp.',
        copyright: 'Thiết kế cho những người yêu trà sữa cao cấp.'
      },
      search: {
        placeholder: 'Tìm trà sữa, matcha, cà phê...',
        emptyCopy: 'Hãy thử tìm trà sữa, matcha, trà trái cây, cà phê hoặc topping.'
      },
      orderSuccess: {
        title: 'Cảm ơn bạn đã chọn MilkTea Premium.',
        orderNumber: 'Mã đơn hàng: MT-2026-001',
        copy: 'Đơn hàng mẫu đã được ghi nhận trên giao diện. Khi tích hợp backend, trạng thái và mã đơn sẽ được cập nhật tự động.'
      }
    }
  }
};

function readPath(source, path) {
  return path
    .split('.')
    .reduce((value, key) => (value && Object.prototype.hasOwnProperty.call(value, key) ? value[key] : undefined), source);
}

function interpolate(value, params = {}) {
  if (typeof value !== 'string') {
    return value;
  }

  return Object.entries(params).reduce(
    (text, [key, replacement]) => text.replaceAll(`{${key}}`, String(replacement)),
    value
  );
}

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function mergeConfig(base, override) {
  if (!isObject(base) || !isObject(override)) {
    return override ?? base;
  }

  return Object.keys({ ...base, ...override }).reduce((result, key) => {
    const baseValue = base[key];
    const overrideValue = override[key];

    result[key] = isObject(baseValue) && isObject(overrideValue)
      ? mergeConfig(baseValue, overrideValue)
      : overrideValue ?? baseValue;

    return result;
  }, {});
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getSiteConfigOverrides() {
  if (!canUseStorage()) {
    return {};
  }

  try {
    const overrides = JSON.parse(window.localStorage.getItem(SITE_CONFIG_STORAGE_KEY) || '{}');

    return isObject(overrides) ? overrides : {};
  } catch {
    return {};
  }
}

export function setSiteConfigOverrides(overrides) {
  if (canUseStorage()) {
    window.localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new CustomEvent('site-config:updated', {
      detail: {
        overrides
      }
    }));
  }

  return overrides;
}

export function getSiteConfig() {
  return mergeConfig(siteConfig, getSiteConfigOverrides());
}

export function getSiteContent(language = DEFAULT_SITE_LANGUAGE) {
  const config = getSiteConfig();

  return config.content[language] || config.content[DEFAULT_SITE_LANGUAGE];
}

export function siteText(path, language = DEFAULT_SITE_LANGUAGE, params = {}) {
  const value = readPath(getSiteContent(language), path) ?? path;

  return interpolate(value, params);
}
