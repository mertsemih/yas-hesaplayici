$(document).ready(function() {
    // Emojileri oluştur
    const emojis = ['🕰️', '🎂', '🎁', '🎉', '⏰', '📅', '🎈', '🎊'];
    const MAX_EMOJIS = 15; // Maksimum emoji sayısı
    
    function createEmoji() {
        // Mevcut emoji sayısını kontrol et
        const currentEmojis = $('.emoji').length;
        
        // Eğer maksimum sayıya ulaşıldıysa yeni emoji oluşturma
        if (currentEmojis >= MAX_EMOJIS) {
            return;
        }
        
        const emoji = $('<div>')
            .addClass('emoji')
            .text(emojis[Math.floor(Math.random() * emojis.length)]);
        
        // Ekranın üst kısmından rastgele bir noktadan başlayan emoji yağmuru
        const startPosition = Math.random() * window.innerWidth;
        emoji.css({
            left: startPosition + 'px',
            top: '-50px', 
            animationDuration: (Math.random() * 3 + 5) + 's',
            animationDelay: Math.random() * 3 + 's'
        });
        
        $('body').append(emoji);
        
        // Animasyon bittiğinde emojiyi kaldırır
        emoji.on('animationend', function() {
            $(this).remove();
        });
    }
    
    // Her 750ms'de bir yeni emoji oluştur
    setInterval(createEmoji, 750);
    
    // Form gönderildiğinde
    $('#ageCalculator').on('submit', function(e) {
        e.preventDefault();
        
        // Doğum tarihini al
        const birthDate = new Date($('#birthDate').val());
        const today = new Date();
        
        // Geçerli bir tarih girilip girilmediğini kontrol et
        if (isNaN(birthDate.getTime())) {
            showResult('Lütfen geçerli bir tarih giriniz.', 'danger');
            return;
        }
        
        // Gelecek tarih kontrolü
        if (birthDate > today) {
            showResult('Gelecek bir tarih girdiniz. Lütfen geçerli bir doğum tarihi giriniz.', 'danger');
            return;
        }
        
        // Yaş hesaplama
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // Doğum günü henüz gelmediyse yaşı bir azalt
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        // Sonucu göster
        const message = `Yaşınız: ${age} yaş`;
        showResult(message, 'success');
        
        // Yaş hesaplandığında ekstra emojiler oluştur (maksimum 5 tane)
        const extraEmojis = Math.min(5, MAX_EMOJIS - $('.emoji').length);
        for(let i = 0; i < extraEmojis; i++) {
            setTimeout(createEmoji, i * 200);
        }
    });
    
    // Sonuç gösterme fonksiyonu
    function showResult(message, type) {
        const resultDiv = $('#result');
        resultDiv.removeClass('alert-success alert-danger')
                .addClass(`alert alert-${type}`)
                .text(message);
    }
    
    // Input alanına odaklanıldığında
    $('#birthDate').on('focus', function() {
        $(this).attr('aria-label', 'Doğum tarihinizi giriniz');
    });
}); 