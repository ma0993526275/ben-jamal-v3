import sadaImg from '../images/sada.jpeg';
import mogalamImg from '../images/mogalam.webp';
import karuhatImg from '../images/karuhat.jpeg';
import poloNavyImg from '../images/polo-navy.jpg';
import poloEmeraldImg from '../images/polo-emerald.jpg';
import poloBurgundyImg from '../images/polo-burgundy.jpg';
import poloDetailCollarImg from '../images/polo-detail-collar.jpg';
import poloEmeraldDetailImg from '../images/polo-emerald-detail.jpg';

export const products = [
    {
        id: 'polo-navy-royal',
        name: 'قميص بولو كحلي رويال فاخر',
        englishName: 'Royal Navy Luxury Pique Polo',
        category: 'sada',
        categoryName: 'مجموعة السادة',
        collection: 'new-arrivals',
        price: 52000,
        originalPrice: 68000,
        image: poloNavyImg,
        alternateImage: poloDetailCollarImg,
        badge: 'الأكثر طلباً',
        badgeType: 'hot',
        rating: 4.9,
        reviewsCount: 84,
        isNew: true,
        sizes: ['M', 'L', 'XL', '2XL', '3XL'],
        colors: [
            { name: 'كحلي ملكي', hex: '#162238' },
            { name: 'أزرق داكن', hex: '#1e3a5f' },
            { name: 'أسود فحمي', hex: '#111827' }
        ],
        description: 'قميص بولو فاخر مصنوع من قطن البيكيه الطبيعي 100% بنعومة لا تضاهى. قصة معاصرة تمنحك إطلالة راقية في مناسبات العمل واللقاءات الخاصة، مع ياقة متماسكة لا تنحني بعد الغسيل وأزرار عاجية طبيعية.',
        fabric: 'قطن مصري بيكيه 100% فائق النعومة',
        fit: 'قصة مريحة منتظمة (Regular Fit)',
        origin: 'صناعة ممتازة ومطابقة للمواصفات العالمية'
    },
    {
        id: 'polo-emerald-elite',
        name: 'قميص بولو زمردي إيميرالد إيليت',
        englishName: 'Emerald Green Elite Cotton Polo',
        category: 'sada',
        categoryName: 'مجموعة السادة',
        collection: 'new-arrivals',
        price: 54000,
        originalPrice: 70000,
        image: poloEmeraldImg,
        alternateImage: poloEmeraldDetailImg,
        badge: 'جديد وحصري',
        badgeType: 'new',
        rating: 5.0,
        reviewsCount: 46,
        isNew: true,
        sizes: ['M', 'L', 'XL', '2XL'],
        colors: [
            { name: 'أخضر زمردي', hex: '#0f5132' },
            { name: 'زيتي غامق', hex: '#234a36' },
            { name: 'أخضر مائل للزرقة', hex: '#0a4235' }
        ],
        description: 'درجة لون زمردية استثنائية تعكس الفخامة والتميز. نسيج قطني مسامي يسمح بمرور الهواء ويمنع التعرق، مثالي للأجواء الحارة والمعتدلة مع لمسات تطريز متقنة على الصدر.',
        fabric: 'قطن ممشط طبيعي 100% بلمسة حريرية',
        fit: 'قصة انسيابية راقية (Modern Fit)',
        origin: 'جودة خياطة مزدوجة عالية المتانة'
    },
    {
        id: 'polo-burgundy-prestige',
        name: 'قميص بولو عنابي برغندي كلاسيك',
        englishName: 'Prestige Burgundy Wine Polo',
        category: 'sada',
        categoryName: 'مجموعة السادة',
        collection: 'premium',
        price: 50000,
        originalPrice: 65000,
        image: poloBurgundyImg,
        alternateImage: poloDetailCollarImg,
        badge: 'خصم 23%',
        badgeType: 'discount',
        rating: 4.8,
        reviewsCount: 62,
        isNew: false,
        sizes: ['L', 'XL', '2XL', '3XL'],
        colors: [
            { name: 'عنابي برغندي', hex: '#581825' },
            { name: 'خمري ملكي', hex: '#6e1a24' }
        ],
        description: 'اللون العنابي الكلاسيكي لإطلالة مفعمة بالثقة والحضور. تصميم كلاسيكي بسيط مع حبكة أكمام وياقة مضلعة متينة تقاوم التمدد والتجعد لتدوم معك طويلاً.',
        fabric: 'خامة قطنية ثقيلة ومعالجة ضد الانكماش',
        fit: 'قصة كلاسيكية أنيقة (Classic Comfort)',
        origin: 'أصباغ أوروبية ثابتة لا تبهت مع الغسيل'
    },
    {
        id: 'polo-sada-navy-essential',
        name: 'قميص بولو سادة إسنشال',
        englishName: 'Classic Minimal Plain Navy Polo',
        category: 'sada',
        categoryName: 'مجموعة السادة',
        collection: 'basic',
        price: 48000,
        originalPrice: 60000,
        image: sadaImg,
        alternateImage: poloNavyImg,
        badge: 'قيمة ممتازة',
        badgeType: 'value',
        rating: 4.7,
        reviewsCount: 112,
        isNew: false,
        sizes: ['M', 'L', 'XL', '2XL'],
        colors: [
            { name: 'كحلي ناعم', hex: '#1e293b' },
            { name: 'رمادي غامق', hex: '#334155' }
        ],
        description: 'القطعة الأساسية في خزانة كل رجل يبحث عن البساطة والعملية. مناسب للارتداء اليومي والأنشطة المتعددة بفضل خامته المرنة وسهولة كيه.',
        fabric: 'قطن ممزوج بنسبة 5% ليكرا لحرية حركة تامة',
        fit: 'قصة كاجوال عملية (Casual Regular)',
        origin: 'تصميم عملي يدوم للاستخدام اليومي'
    },
    {
        id: 'polo-mogalam-sportive',
        name: 'قميص بولو مقلّم كاجوال عصري',
        englishName: 'Striped Vintage Sportive Polo',
        category: 'mogalam',
        categoryName: 'مجموعة المقلّم',
        collection: 'striped-checkered',
        price: 50000,
        originalPrice: 65000,
        image: mogalamImg,
        alternateImage: poloDetailCollarImg,
        badge: 'تشكيلة الموسم',
        badgeType: 'hot',
        rating: 4.8,
        reviewsCount: 53,
        isNew: true,
        sizes: ['L', 'XL', '2XL'],
        colors: [
            { name: 'خطوط كحلية وبيضاء', hex: '#1e3a8a' },
            { name: 'خطوط رمادية', hex: '#64748b' }
        ],
        description: 'خطوط متناسقة تضفي حيوية وأناقة شبابية عصرية. حبكة نسيجية دقيقة تضمن تناغم الخطوط عند الدرزات، مما يعكس أعلى معايير الجودة والاهتمام بالتفاصيل.',
        fabric: 'قطن مصري منسوج خيوط مصبوغة يارن داي (Yarn-Dyed)',
        fit: 'قصة منتظمة كاجوال',
        origin: 'ياقة قميص كلاسيكية مع تطريز راقٍ'
    },
    {
        id: 'polo-karuhat-oxford',
        name: 'قميص كاروهات سبورت أكسفورد',
        englishName: 'Oxford Checkered Heritage Polo',
        category: 'karuhat',
        categoryName: 'مجموعة الكاروهات',
        collection: 'striped-checkered',
        price: 52000,
        originalPrice: 65000,
        image: karuhatImg,
        alternateImage: poloEmeraldDetailImg,
        badge: 'الأكثر أناقة',
        badgeType: 'special',
        rating: 4.9,
        reviewsCount: 71,
        isNew: true,
        sizes: ['M', 'L', 'XL', '2XL', '3XL'],
        colors: [
            { name: 'مربعات كحلي وخردلي', hex: '#1e293b' },
            { name: 'مربعات رمادية وزيتية', hex: '#475569' }
        ],
        description: 'مزيج فريد بين فخامة نقشة الكاروهات وراحة قمصان البولو. يمنحك التوازن المثالي بين الطابع الرياضي والأناقة الرسمية للطلعات والزيارات.',
        fabric: 'نسيج قطن أكسفورد ناعم وخفيف الوزن',
        fit: 'قصة مريحة جداً تناسب الحركة',
        origin: 'حياكة دقيقة مع ياقة معززة'
    }
];

export const reviews = [
    {
        id: 1,
        name: 'د. طارق عثمان',
        city: 'الخرطوم - المعمورة',
        rating: 5,
        date: 'منذ يومين',
        comment: 'صراحة خامة القمصان فوق الممتازة! القطن بارد جداً على الجسم وناعم، والغسيل ما أثر في المقاس أو اللون إطلاقاً. توصيل سريع ومندوب محترم جداً.',
        product: 'قميص بولو كحلي رويال فاخر'
    },
    {
        id: 2,
        name: 'المهندس أحمد الفاتح',
        city: 'بورتسودان',
        rating: 5,
        date: 'منذ 5 أيام',
        comment: 'أول مرة أطلب من متجر بن جمال، وانبهرت بدقة التغليف والمقاس جاي بالملي زي ما هو مكتوب في جدول المقاسات. اللون الزمردي على الطبيعة أفخم بكتير من الصور!',
        product: 'قميص بولو زمردي إيميرالد إيليت'
    },
    {
        id: 3,
        name: 'ياسر عبد المجيد',
        city: 'الخرطوم - الرياض',
        rating: 5,
        date: 'منذ أسبوع',
        comment: 'تجربة ممتازة وتعامل راقي جداً عبر الواتساب. طلبت قميصين سادة وقميص كاروهات، القماش قطن أصلي والأزرار والياقة مخدومة بعناية. أنصح بهم بشدة.',
        product: 'قميص كاروهات سبورت أكسفورد'
    },
    {
        id: 4,
        name: 'حسام الدين محمد',
        city: 'مدني',
        rating: 5,
        date: 'منذ أسبوعين',
        comment: 'أسعار مناسبة جداً مقارنة بجودة الأقمشة المتوفرة في السوق. شكراً بن جمال على المصداقية والاهتمام بالتفاصيل.',
        product: 'قميص بولو عنابي برغندي كلاسيك'
    }
];

export const sizeGuideData = [
    { size: 'M', chest: '52 - 54 سم', length: '70 سم', shoulder: '44 سم', weight: '65 - 75 كجم' },
    { size: 'L', chest: '55 - 57 سم', length: '72 سم', shoulder: '46 سم', weight: '75 - 85 كجم' },
    { size: 'XL', chest: '58 - 60 سم', length: '74 سم', shoulder: '48 سم', weight: '85 - 95 كجم' },
    { size: '2XL', chest: '61 - 63 سم', length: '76 سم', shoulder: '50 سم', weight: '95 - 105 كجم' },
    { size: '3XL', chest: '64 - 67 سم', length: '78 سم', shoulder: '52 سم', weight: '105 - 118 كجم' }
];
