Add-Type -AssemblyName System.Drawing

function Create-Icon {
    param([int]$size, [string]$outPath)

    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::White)

    # Background rounded rect (approximated)
    $bgColor = [System.Drawing.Color]::FromArgb(44, 62, 80)
    $bgBrush = New-Object System.Drawing.SolidBrush $bgColor
    $radius = [int]($size * 0.15)
    $rect = New-Object System.Drawing.Rectangle 0, 0, $size, $size
    $g.FillEllipse($bgBrush, 0, 0, $size, $size)
    $g.FillRectangle($bgBrush, $radius, 0, ($size - 2*$radius), $size)
    $g.FillRectangle($bgBrush, 0, $radius, $size, ($size - 2*$radius))

    # Shield (polygon approximation with filled rectangle + ellipse top)
    $shieldColor = [System.Drawing.Color]::FromArgb(231, 76, 60)
    $shieldBrush = New-Object System.Drawing.SolidBrush $shieldColor

    $shieldLeft = [int]($size * 0.18)
    $shieldRight = [int]($size * 0.82)
    $shieldTop = [int]($size * 0.15)
    $shieldBottom = [int]($size * 0.88)
    $shieldMid = [int]($size * 0.60)

    $shieldPoints = @(
        [System.Drawing.Point]::new([int]($size*0.50), $shieldTop),
        [System.Drawing.Point]::new($shieldRight, [int]($size*0.30)),
        [System.Drawing.Point]::new($shieldRight, $shieldMid),
        [System.Drawing.Point]::new([int]($size*0.50), $shieldBottom),
        [System.Drawing.Point]::new($shieldLeft, $shieldMid),
        [System.Drawing.Point]::new($shieldLeft, [int]($size*0.30))
    )
    $g.FillPolygon($shieldBrush, $shieldPoints)

    # House (white)
    $houseBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)

    # Roof triangle
    $roofPoints = @(
        [System.Drawing.Point]::new([int]($size*0.50), [int]($size*0.25)),
        [System.Drawing.Point]::new([int]($size*0.72), [int]($size*0.44)),
        [System.Drawing.Point]::new([int]($size*0.28), [int]($size*0.44))
    )
    $g.FillPolygon($houseBrush, $roofPoints)

    # House body
    $houseRect = New-Object System.Drawing.Rectangle ([int]($size*0.34)), ([int]($size*0.43)), ([int]($size*0.32)), ([int]($size*0.22))
    $g.FillRectangle($houseBrush, $houseRect)

    # Door (dark)
    $doorBrush = New-Object System.Drawing.SolidBrush $bgColor
    $doorRect = New-Object System.Drawing.Rectangle ([int]($size*0.44)), ([int]($size*0.54)), ([int]($size*0.12)), ([int]($size*0.11))
    $g.FillRectangle($doorBrush, $doorRect)

    $g.Dispose()
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created: $outPath"
}

$baseDir = Split-Path $MyInvocation.MyCommand.Path
Create-Icon -size 192 -outPath "$baseDir\icon-192.png"
Create-Icon -size 512 -outPath "$baseDir\icon-512.png"
Write-Host "Icons generated successfully!"
