"use strict"; 
module.exports = { 
    description: "Super Rich Text Plugin",
    
    name: "Text Mesh",
    install: "Install",
    install_sample: "Install Sample",
    root: "Root Node",

    menu: {
        name: "TextMesh",
        create_font: "Create Font Asset",
    },

    font_info: {
        name: "Create Font Asset",
        source_font: "Source Font",  
        custom_font: "File Font",
        system_font: "System Font",  
        gen_font_size: "Font Sample Size",    
        auto_font_size: "Auto Set",
        custom_font_size: "Manual Set",  
        pad_mode_px: "Pixel Value",
        pad_mode_ratio: "Percentage",        
        padding: "Padding",      
        padding_trim: "Padding Trim",
        enable_dynamic: "Dynamic Font",
        static_channel_size: "Static Channel Size",
        atlas_size: "Atlas Size",
        charset: "Charset Text",
        tmf_font_file: "TMF Font File",  
        begin_gen: "Start",        
        end_gen: "Cancel",
        base_info: "Base Info",
        settings: "Settings",
        atlas_info: "Atlas Info",
        search_char: "Search Char",
    },

    settings: {
        name: "Settings",
        save: "Save",
        modify: "Modify",
        reCalc: "ReGenerate",
        underLineOffset: "Underline Offset",
        keepUnlderLineSpace: "Underline Space",
        underLineThickness: "Underline Thickness",
        strikeOffset: "Strike Offset",
        strikeThickness: "Strike Thickness",
        scriptThickness: "Script Thickness",
    },

    messages: {
        save: "Save File",
        need_font: "Need to set TTFont resource file",
        need_charset: "Need to set charset file",
        can_not_found_asset: "Can not found asset file's UUID",
        font_file_error: "Error TMF file",
        error_range_hex: "Error hex range:",
    }
};